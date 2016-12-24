"use strict";

var weather = require('openweather-node');
weather.setAPPID('5f3b1bf8b9a7b3f3368bbe57a347e308');
weather.setCulture('es');

var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  var lcd = new five.LCD({
    //      RS    EN    D4    D5    D6    D7
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
  });

  weather.now(6693229, (err, data) => {
    if(err) console.log(err);
    else {
      let degreeTemp = data.getDegreeTemp();
      let temperature = `${degreeTemp.temp.toFixed(1)} ${degreeTemp.temp_min} - ${degreeTemp.temp_max}`;
      let weather = data.values.weather[0].description;

      lcd.cursor(0, 0).print(temperature);
      lcd.cursor(1, 0).print(weather);
    }
  });

});
