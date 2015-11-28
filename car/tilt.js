var five = require("johnny-five");
var temporal = require("temporal");

function Tilt() {
  var tilt = new five.Sensor.Digital(7);

  function onTilt(callback) {
    tilt.on("change", function() {
    if (this.value) {
        callback();
      }
    });
  }

  return {
    onTilt: onTilt
  };
}

module.exports = Tilt;
