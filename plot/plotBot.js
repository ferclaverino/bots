var five = require("johnny-five");

function PlotBot(plotModel) {

  // Setup
  var servo1 = five.Servo({
      pin: 9,
      range: [0,90]
  });
  var servo2 = five.Servo({
      pin: 10,
      range: [0,90]
  });

  // Initialize position
  to(5, 5);

  function go(x, y, ms) {
    var angles = plotModel.inverse(x, y);
    to(angles[0], angles[1], ms);
  };

  function to(angle1, angle2, ms) {
    ms = ms || 500;
    servo1.to(angle1, ms);
    servo2.to(angle2, ms);
  }

  return {
    go: go,
    to: to
  };
}

module.exports = PlotBot;
