'use strict';

const five = require('johnny-five');
const av = require('tessel-av');
const Board = five.Board;
const Motor = five.Motor;
const Tessel = require('tessel-io');
const Car = require('./car.js');

class Tessel2Factory {

  buildBoard() {
    return new Board({
      io: new Tessel()
    });
  }

  buildMotorL() {
    return Motor([ 'b5', 'b4', 'b3' ]);
  }

  buildMotorR() {
    return Motor([ 'a5', 'a4', 'a3' ]);
  }

  buildCar() {
    const motorL = this.buildMotorL();
    const motorR = this.buildMotorR();
    return new Car(motorL, motorR);
  }

  buildCamera() {
    return new av.Camera({
      // fps: 15,
      dimensions: "320x240",
      quality: 50,
    });
  }

}

module.exports = Tessel2Factory;
