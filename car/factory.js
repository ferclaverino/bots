var five = require("johnny-five");
var Car = require("./car.js");
var Proximity = require("./proximity.js");
var CarAvoidable = require("./carAvoidable.js");

function Factory(boardConfig) {

  function onReady(callback) {
    var board = new five.Board(boardConfig);
    board.on("ready", function() {
      callback();
    });
  }

  function buildCar() {
    return new Car();
  }

  function buildProximity() {
    return new Proximity();
  }

  function buildCarAvoidable() {
    var car = buildCar();
    var proximity = buildProximity();
    return new CarAvoidable(car, proximity);
  }

  return {
    onReady: onReady,
    buildCar: buildCar,
    buildProximity: buildProximity,
    buildCarAvoidable: buildCarAvoidable,
  };
}

module.exports = Factory;
