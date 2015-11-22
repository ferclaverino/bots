var keypress = require("keypress");
keypress(process.stdin);

var Factory = require("./factory.js");
var factory = new Factory({
   port: "/dev/rfcomm0"
});

factory.onReady(function() {
  var car = factory.buildCarAvoidable();
  var duplicatedKeyPress = false;

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function(ch, key) {
    if (duplicatedKeyPress) {
      duplicatedKeyPress = false;
      return;
    } else {
      duplicatedKeyPress = true;
    }

    if (!key) {
      return;
    }

    console.log(key.name);
    if (key.name === "q") {
      car.stop();
      process.exit();
    } else if (key.name === "up") {
      car.start();
    } else if (key.name === "space") {
      car.stop();
    }
  });
});
