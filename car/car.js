var five = require("johnny-five");

var states = {
  forward: 'F',
  reverse: 'R',
  left: 'L',
  right: 'R',
  stop: 'S'
}

function Car() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.M1);
  var motorR = new five.Motor(configs.M2);
  var speed = 164;
  var state = states.stop;

  function forward() {
    if (state != states.forward) {
      state = states.forward;
      motorL.forward(speed);
      motorR.forward(speed);
    }
  }

  function reverse() {
    if (state != states.reverse) {
      state = states.reverse;
      motorL.reverse(speed);
      motorR.reverse(speed);
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
      motorL.forward(speed);
      motorR.reverse(speed);
    }
  }

  function right() {
    if (state != states.right) {
      state = states.right;
      motorL.reverse(speed);
      motorR.forward(speed);
    }
  }

  return {
    forward: forward,
    reverse: reverse,
    stop: stop,
    left: left,
    right: right
  };
}

module.exports = Car;
