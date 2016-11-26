var five = require("johnny-five");
var temporal = require("temporal");

var board = new five.Board({
  port: "/dev/rfcomm0"
});

board.on('ready', function() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.M2);
  var motorR = new five.Motor(configs.M1);

  // set 1s interval
  var interval = 1000;

  // set half speed
  var speed = 255/2;

  temporal.queue([{
    delay: interval,
    task: function() {
      // forward
      motorL.forward(speed);
      motorR.forward(speed);
    }
  }, {
    delay: interval,
    task: function() {
      // reverse
      motorL.reverse(speed);
      motorR.reverse(speed);
    }
  }, {
    delay: interval,
    task: function() {
      // left
      motorL.reverse(speed);
      motorR.forward(speed);
    }
  }, {
    delay: interval,
    task: function() {
      // right
      motorL.forward(speed);
      motorR.reverse(speed);
    }
  }, {
    delay: interval,
    task: function() {
      // stop
      motorL.stop();
      motorR.stop();
    }
  }]);

  this.on("exit", function() {
    // stop
    motorL.stop();
    motorR.stop();
  });
});
