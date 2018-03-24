'use strict';
const tessel = require('tessel');

function ledsEndPoint(req, res) {
  // Create a regular expression to find the number at the end of the url
  var indexRegex = /(\d)$/;

  // Capture the number, returns an array
  var result = indexRegex.exec(req.url);

  // Grab the captured result from the array
  var index = result[1];

  // Use the index to refence the correct LED
  var led = tessel.led[index];

  // Toggle the state of the led and call the callback after that's done
  led.toggle((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ on: led.isOn });
    }
  });
}

module.exports = ledsEndPoint;
