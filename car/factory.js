var five = require("johnny-five");
var AutoPilot = require("./autoPilot.js");
var Car = require("./car.js");
var CarWithAutoPilot = require("./carWithAutoPilot.js");
var Proximity = require("./proximity.js");
var Tilt = require("./tilt.js");

function Factory(boardConfig) {

  function buildAutoPilot() {
    var car = buildCar();
    var tilt = buildTilt();
    return new AutoPilot(car, tilt);
  }

  function buildCar() {
    return new Car();
  }

  function buildCarWithAutoPilot() {
    var car = buildCar();
    var tilt = buildTilt();
    var autoPilot = new AutoPilot(car, tilt);
    return CarWithAutoPilot(car, autoPilot);
  }

  function buildProximity() {
    return new Proximity();
  }

  function buildTilt() {
    return new Tilt();
  }

  function onReady(callback) {
    var board = new five.Board(boardConfig);
    board.on("ready", function() {
      callback();
    });
  }

  return {
    buildAutoPilot: buildAutoPilot,
    buildCar: buildCar,
    buildCarWithAutoPilot: buildCarWithAutoPilot,
    buildProximity: buildProximity,
    buildTilt: buildTilt,
    onReady: onReady,
  };

}

module.exports = Factory;
