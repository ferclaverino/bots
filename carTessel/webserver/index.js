const path = require('path');
const express = require('express');
const ledsEndPoint = require('./ledsEndPoint.js');
const carEndPoint = require('./carEndPoint.js');
const Tessel2Factory = require('../bot/tessel2Factory.js');

// Setup bot
const factory = new Tessel2Factory();
let board = factory.buildBoard();
let carBot;

board.on('ready', () => {
  carBot = factory.buildCar();
});

board.on('exit', () => {
  carBot.stop();
});

// Setup webserver
const app = express();
app.use(express.static(path.join(__dirname, '/public')));

app.get(/leds/, ledsEndPoint);
app.get(/car/, (req, res) => carEndPoint(req, res, carBot));

app.listen(80, () => console.log('Example app listening on port 80!'));
