var five = require("johnny-five");
var board = new five.Board({
   //port: "/dev/rfcomm0"
});
var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;

board.on("ready", function() {
  var motorL = new five.Motor(configs.M1);
  var motorR = new five.Motor(configs.M2);

  // Add motor to REPL (optional)
  this.repl.inject({
    motorL: motorL,
    motorR: motorR
  });

});
