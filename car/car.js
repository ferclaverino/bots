var five = require("johnny-five");

function Car(boardConfig) {
  var motorL;
  var motorR;
  var speeds = [0, 64, 128, 194, 255];
  var speed = 0;
  var isTurning = false;

  function onReady(callback) {
    var board = new five.Board(boardConfig);
    board.on("ready", function() {
      var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
      motorL = new five.Motor(configs.M1);
      motorR = new five.Motor(configs.M2);

      callback();
    });
  }

  function forward() {
    if (isTurning) {
      motorL.forward();
      motorR.forward();
      isTurning = false;
    } else {
      if (speed < speeds.length) {
        speed++;
        motorL.forward(speeds[speed]);
        motorR.forward(speeds[speed]);
      }
    }
  }

  function stop() {
    speed = 0;
    motorL.stop();
    motorR.stop();
  }

  function left() {
    isTurning = true;
    motorL.forward();
    motorR.reverse();
  }

  function right() {
    isTurning = true;
    motorL.reverse();
    motorR.forward();
  }

  return {
    onReady: onReady,
    forward: forward,
    stop: stop,
    left: left,
    right: right
  };
}

module.exports = Car;
