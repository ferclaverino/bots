var five = require("johnny-five");
var temporal = require("temporal");

function DeltaBot(deltaModel) {

  // Setup
  var servo1 = five.Servo({
      pin: 9,
      range: [0,90]
  });
  var servo2 = five.Servo({
      pin: 10,
      range: [0,90]
  });
  var servo3 = five.Servo({
      pin: 11,
      range: [0, 90]
  });

  var Z = {
    min: -220,
    max: -320,
  };

  function go(x, y, z, ms) {
    var angles = deltaModel.inverse(x, y, z);
    servo1.to(angles[1], ms);
    servo2.to(angles[2], ms);
    servo3.to(angles[3], ms);
    console.log(angles);
  };

  function box(l, z) {
    l = l || 50;
    z = z || -250;
    var delay = 1000;
    temporal.queue([
      { delay: delay, task: function() { go( l,  l, z, delay); } },
      { delay: delay, task: function() { go( l, -l, z, delay); } },
      { delay: delay, task: function() { go(-l, -l, z, delay); } },
      { delay: delay, task: function() { go(-l,  l, z, delay); } },
      { delay: delay, task: function() { go( l,  l, z, delay); } }
    ]);
  }

  function hi(z) {
    z = z || Z.max;
    var delay = 500;
    temporal.queue([
      { delay: delay, task: function() { go( 0,  0, Z.min, delay); } },
      { delay: delay, task: function() { go( 0, 0, z, delay); } },
      { delay: delay, task: function() { go( 0,  0, Z.min, delay); } },

    ]);
  }

  function init() {
    // Initial position
    go(0, 0, Z.min);
  }

  return {
    go: go,
    box: box,
    hi: hi,
    init: init
  };
}

module.exports = DeltaBot;
