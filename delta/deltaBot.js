var five = require("johnny-five");

function DeltaBot(deltaModel, Zmin, height) {
  height = height || 50;
  Zmin = Zmin || 150;
  var Z = {
    min: Zmin
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

  // Initialize position
  servo1.to(20);
  servo2.to(20);
  servo3.to(20);

  function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  function go(x, y, inverseZ, ms) {
    var z = mapRange(height - inverseZ, 0, height, Z.min, Z.max) * -1;
    var angles = deltaModel.inverse(x, y, z);
    servo1.to(angles[1], ms);
    servo2.to(angles[2], ms);
    servo3.to(angles[3], ms);
    console.log(angles);
  };

  function to(angle1, angle2, angle3, ms) {
    ms = ms || 500;
    servo1.to(angle1, ms);
    servo2.to(angle2, ms);
    servo3.to(angle3, ms);
  }

  return {
    go: go,
    to: to
  };
}

module.exports = DeltaBot;
