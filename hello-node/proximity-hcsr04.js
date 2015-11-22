var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/rfcomm0"
});

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  var count = 0;
  var avg = 0;

  proximity.on("data", function() {
    avg += this.cm;
    count++;
    if (count == 3) {
      avg = avg / count;
      console.log("Proximity cm: ", avg);
      avg = 0;
      count = 0;
    }
  });

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});
