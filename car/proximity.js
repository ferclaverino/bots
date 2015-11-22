var five = require("johnny-five");

function Proximity() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7,
    freq: 250,
  });

  function hasObstacle(distance, yes, no) {
      proximity.on("data", function() {
        console.log("Proximity cm: ", this.cm);
        if (this.cm < distance) {
          yes();
        } else {
          no();
        }
      });
  }

  return {
    hasObstacle: hasObstacle
  };
}

module.exports = Proximity;
