var five = require("johnny-five");
var temporal = require("temporal");

var states = {
  auto: 'A',
  manual: 'M',
};

function CarWithAutoPilot(car, autoPilot) {
  var state = states.manual;
  var isStop = false;

  function forward() {
    if (isStop) state = states.manual;
    if (state == states.manual) car.forward();
  }

  function reverse() {
    if (state == states.manual) car.reverse();
  }

  function left() {
    if (state == states.manual) car.left();
  }

  function right() {
    if (state == states.manual) car.right();
  }

  function start() {
    if (isStop) state = states.auto;
    if (state == states.auto) autoPilot.start();
  }

  function stop() {
    if (state == states.auto) autoPilot.stop();
    if (state == states.manual) car.stop();
    isStop = true;
  }

  return {
    forward: forward,
    reverse: reverse,
    left: left,
    right: right,
    start: start,
    stop: stop
  };
}

module.exports = CarWithAutoPilot;
