var Factory = require("./factory.js");
var factory = new Factory({
  //  port: "/dev/rfcomm0"
});

factory.onReady(function() {
  var tilt = factory.buildTilt();

  tilt.onTilt(function() {
    console.log('ups');
  });

});
