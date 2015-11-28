var five = require("johnny-five");
var temporal = require("temporal");

var states = {
  forward: 'F',
  reverse: 'R',
  left: 'L',
  right: 'R',
  stop: 'S'
}

function Car() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.M2);
  var motorR = new five.Motor(configs.M1);
  var speed = 164;
  var speedL = speed;
  var speedR = speed - 4;
  var state = states.stop;

  function getGradient(max, steps) {
    var gradient = [];
    for (var i = 1; i <= steps; i++) {
      gradient.push(max * i / steps);
    }
    return gradient;
  }

  function applyGradient(gradient, motor, delay) {
    temporal.queue(gradient.map(function(speed) {
      return {
        delay: delay, task: function() {
          motor.forward(speed);
        }
      };
    }));
  }

  function forward() {
    if (state != states.forward) {
      state = states.forward;
      motorL.forward(speedL);
      motorR.forward(speedR);
    }
  }

  function forwardGradual(steps, callback) {
    if (state != states.forward) {
      state = states.forward;
      var delay = 100;
      var gradientL = getGradient(speedL, steps);
      var gradientR = getGradient(speedR, steps);
      applyGradient(gradientL, motorL, delay);
      applyGradient(gradientR, motorR, delay);
      temporal.wait(delay * (steps + 1), callback);
    }
  }

  function reverse() {
    if (state != states.reverse) {
      state = states.reverse;
      motorL.reverse(speedL);
      motorR.reverse(speedR);
    }
  }

  function stop() {
    if (state != states.stop) {
      state = states.stop;
      motorL.stop();
      motorR.stop();
    }
  }

  function left() {
    if (state != states.left) {
      state = states.left;
      motorL.reverse(speedL);
      motorR.forward(speedR);
    }
  }

  function right() {
    if (state != states.right) {
      state = states.right;
      motorL.forward(speedL);
      motorR.reverse(speedR);
    }
  }

  return {
    forward: forward,
    forwardGradual: forwardGradual,
    reverse: reverse,
    stop: stop,
    left: left,
    right: right
  };
}

module.exports = Car;
