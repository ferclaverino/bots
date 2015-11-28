var Factory = require('./factory.js');
var Commander = require('./commander.js');

var factory = new Factory({
   port: '/dev/rfcomm0'
});
var commander = new Commander();

factory.onReady(function() {
  var car = factory.buildCarWithAutoPilot();

  commander.listen({
    'a': function() { car.start(); },
    'up': function() { car.forward(); },
    'down': function() { car.reverse(); },
    'left': function() { car.left(); },
    'right': function() { car.right(); },
    'space': function() { car.stop(); },
  });
});
