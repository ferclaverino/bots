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
      // Log the error, send back a 500 (internal server error) response to the client
      console.log(err);
      res.status(500).send({ error: err });
    } else {
      // The led was successfully toggled, respond with the state of the toggled led using led.isOn
      res.send({ on: led.isOn });
    }
  });
}

module.exports = ledsEndPoint;
