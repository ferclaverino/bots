var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var accelerometer = new five.Accelerometer({
    controller: "MPU6050"
  });
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  var motorL = new five.Motor(configs.M2);
  var motorR = new five.Motor(configs.M1);
  var speed = 255 * 0.5;
  accelerometer.on("change", function() {
    var pitch = this.pitch;
    var adjustSpeed = pitch / -45 * speed;
    console.log("pitch: ", pitch, ", speed: ", adjustSpeed);
    if (adjustSpeed > 0) {
      motorL.forward(adjustSpeed + speed / 2);
      motorR.forward(adjustSpeed + speed / 2);
    } else {
      motorL.reverse(-adjustSpeed - speed / 2);
      motorR.reverse(-adjustSpeed - speed / 2);
    }
  });

  this.on('exit', () => {
    motorL.stop();
    motorR.stop();
  });

});
