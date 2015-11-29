var five = require("johnny-five");

function DeltaBot(deltaModel, height) {
  height = height || 50;
  var Z = {
    min: 220
  };
  Z.max = Z.min + height

  // Setup
  var servo1 = five.Servo({
      pin: 9,
      range: [0,90]
  });
  var servo2 = five.Servo({
      pin: 10,
      range: [0,90]
  });
  var servo3 = five.Servo({
      pin: 11,
      range: [0, 90]
  });

  function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  function go(x, y, inverseZ, ms) {
    var z = mapRange(height - inverseZ, 0, height, Z.min, Z.max) * -1;
    console.log(inverseZ, z)
    var angles = deltaModel.inverse(x, y, z);
    servo1.to(angles[1], ms);
    servo2.to(angles[2], ms);
    servo3.to(angles[3], ms);
    console.log(angles);
  };

  return {
    go: go
  };
}

module.exports = DeltaBot;
