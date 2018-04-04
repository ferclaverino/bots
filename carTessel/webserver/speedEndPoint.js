'use strict';

function speedEndPoint(req, res, car) {
  const url = req.url;
  const speed = url.split('/').pop();

  if (isNaN(speed)) {
    res.status(500).send({ error: 'Invalid speed ' + speed });
  } else {
    car.setSpeed(parseInt(speed));
    res.send({ speed: speed });
  }
}

module.exports = speedEndPoint;
