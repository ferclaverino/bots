var five = require("johnny-five");
var temporal = require("temporal");

var states = {
  forwad: 'F',
  stop: 'S',
  avoiding: 'A'
};

function CarAvoidable(car, proximity) {

  var state = states.stop;

  function foward() {
    if (state == states.stop) {
      state = states.forward;
      console.log('forward');
      car.forward();
    }
  }

  function avoid() {
    if (state != states.avoiding) {
      state = states.avoiding;
      console.log('ups...')

      temporal.queue([
        {
          delay: 1000, task: function() {
            console.log('reverse');
            car.reverse();
          }
        }, {
          delay: 500, task: function() {
            console.log('turn');
            car.left();
          }
        }, {
          delay: 500, task: function() {
            console.log('stop');
            stop();
          }
        }
      ]);
    }
  }

  function start() {
    proximity.hasObstacle(15, avoid, foward);

    // proximity.hasObstacle(10, function() {
    //   console.log('si');
    // }, function() {
    //   console.log('no');
    // });
  }

  function stop() {
    state = states.stop;
    car.stop();
  }

  return {
    start: start,
    stop: stop
  };
}

module.exports = CarAvoidable;
