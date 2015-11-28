var five = require("johnny-five");
var temporal = require("temporal");

var states = {
  forward: 'F',
  stop: 'S',
  avoiding: 'A'
};

function AutoPilot(car, tilt) {
  tilt.onTilt(avoid);

  var state = states.stop;

  function foward() {
    if (state == states.stop || state == states.avoiding) {
      car.forward();
      temporal.wait(500, function() {
        state = states.forward;
      });

      // car.forwardGradual(4, function() {
      //   state = states.forward;
      // });
    }
  }

  function avoid() {
    if (state == states.forward) {
      state = states.avoiding;

      temporal.queue([
        {
          delay: 0, task: function() { car.stop(); }
        }, {
          delay: 500, task: function() { car.reverse(); }
        },{
          delay: 500, task: function() { car.stop(); }
        }, {
          delay: 500, task: function() { car.left(); }
        }, {
          delay: 300, task: function() { car.stop(); }
        }, {
          delay: 500, task: function() {  foward(); }
        }
      ]);
    }
  }

  function start() {
    foward();
  }

  function stop() {
    state = states.stop;
    car.stop();
  }

  return {
    start: start,
    stop: stop
  };
}

module.exports = AutoPilot;
