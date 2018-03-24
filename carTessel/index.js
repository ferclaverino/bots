'use strict';

const Tessel2Factory = require('./tessel2Factory.js');
const temporal = require('temporal');

const factory = new Tessel2Factory();
let board = factory.buildBoard();
let car;

board.on('ready', () => {

  car = factory.buildCar();

  temporal.queue([
    {
      delay: 0, task: () => { car.stop(); }
    }, {
      delay: 500, task: () => { car.forward(); }
    },{
      delay: 5000, task: () => { car.stop(); }
    }, {
      delay: 500, task: () => { car.left(); }
    }, {
      delay: 5000, task: () => { car.stop(); }
    }
  ]);

});

board.on('exit', () => {
  car.stop();
});
