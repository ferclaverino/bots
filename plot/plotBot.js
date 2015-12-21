var five = require("johnny-five");
var temporal = require("temporal");

function OffsetAngle(offset) {
  function angle(angle) {
    return angle + offset;
  }
  return {
    angle: angle
  }
}

function PlotBot(plotModel, leftPin, rigthPin, leftOffset, rightOffset) {
  var l = new OffsetAngle(leftOffset);
  var r = new OffsetAngle(rightOffset);

  // setup servos
  var servoLeft = five.Servo({
      pin: leftPin,
      range: [l.angle(0), l.angle(90)],
      startAt: l.angle(0)
  });
  var servoRight = five.Servo({
      pin: rigthPin,
      range: [r.angle(0), r.angle(90)],
      startAt: r.angle(0)
  });
  var plotServos = five.Servos([servoLeft, servoRight]);

  // setup animation`
  var plotAnimation = new five.Animation(plotServos);
  var calibrateSegment = {
    duration: 1500,
    cuePoints: [0, 0.5, 1.0],
    keyFrames: [
      [{degrees: l.angle(0)}, {degrees: l.angle(90)}, {degrees: l.angle(0)}],
      [{degrees: r.angle(0)}, {degrees: r.angle(90)}, {degrees: r.angle(0)}]
    ]
  };

  // Initialize position
  to(0, 0);

  function go(x, y, ms) {
    var angles = plotModel.inverse(x, y);
    to(angles[0], angles[1], ms);
  };

  function to(angle1, angle2, ms) {
    ms = ms || 500;
    servoLeft.to(l.angle(angle1), ms);
    servoRight.to(r.angle(angle2), ms);
  }

  function calibrate(times) {
    times = times || 3;
    var task = function() {
      plotAnimation.enqueue(calibrateSegment);
    };
    var steps = [{
      delay: 0,
      task: task
    }];

    for (var i = 1; i < times; i++) {
      steps.push({
        delay: calibrateSegment.duration * 1.1,
        task: task
      });
    }
    temporal.queue(steps);
  }

  return {
    // go: go,
    to: to,
    calibrate: calibrate
  };
}

module.exports = PlotBot;
