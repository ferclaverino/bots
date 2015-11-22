var keypress = require("keypress");
keypress(process.stdin);

var Car = require("./car.js");
var car = new Car({
   port: "/dev/rfcomm0"
});

car.onReady(function() {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  var avoid = false;

  process.stdin.on("keypress", function(ch, key) {
    if (avoid) {
      avoid = false;
      return;
    } else {
      avoid = true;
    }

    if (!key) {
      return;
    }
    
    console.log(key.name);
    if (key.name === "q") {
      car.stop();
      process.exit();
    } else if (key.name === "up") {
      car.forward();
    } else if (key.name === "down") {
      car.stop();
    } else if (key.name === "left") {
      car.left();
    } else if (key.name === "right") {
      car.right();
    }

  });
});
