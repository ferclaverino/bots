var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var motors = new five.Motors([
    [ "a5", "a4", "a3" ],
    [ "b5", "b4", "b3" ],
  ]);
  var speed = 127;

  motors.forward(speed);
});
