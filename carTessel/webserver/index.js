const path = require('path');
const express = require('express');
const ledsEndPoint = require('./ledsEndPoint.js');
const moveEndPoint = require('./moveEndPoint.js');
const speedEndPoint = require('./speedEndPoint.js');
const streamEndPoint = require('./streamEndPoint.js');
const captureEndPoint = require('./captureEndPoint.js');

const Tessel2Factory = require('../bot/tessel2Factory.js');

// Setup bot
const factory = new Tessel2Factory();
let board = factory.buildBoard();
let camera = factory.buildCamera();
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
app.get(/move/, (req, res) => moveEndPoint(req, res, carBot));
app.get(/speed/, (req, res) => speedEndPoint(req, res, carBot));
app.get(/stream/, (req, res) => streamEndPoint(req, res, camera));
app.get(/capture/, (req, res) => captureEndPoint(req, res, camera));

app.listen(80);
