var five = require("johnny-five");
var temporal = require("temporal");
var keypress = require('keypress');

var board = new five.Board({
  port: "/dev/rfcomm0",
  repl: false
});

keypress(process.stdin);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

board.on('ready', function() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.M2);
  var motorR = new five.Motor(configs.M1);
  // set half speed
  var speed = 255/2;

  process.stdin.on('keypress', function(ch, key) {
    if (!key) {
      return;
    } else if (key.name === 'q') {
      process.exit();
    } else if (key.name === 'up') {
      // forward
      motorL.forward(speed);
      motorR.forward(speed);
    } else if (key.name === 'down') {
      // reverse
      motorL.reverse(speed);
      motorR.reverse(speed);
    } else if (key.name === 'left') {
      // left
      motorL.reverse(speed);
      motorR.forward(speed);
    } else if (key.name === 'right') {
      // right
      motorL.forward(speed);
      motorR.reverse(speed);
    } else if (key.name === 'space') {
      // stop
      motorL.stop();
      motorR.stop();
    }
  });

  this.on("exit", function() {
    // stop
    motorL.stop();
    motorR.stop();
  });
  
});
