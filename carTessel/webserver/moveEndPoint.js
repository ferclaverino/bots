'use strict';

function moveEndPoint(req, res, car) {
  const url = req.url;
  const action = url.split('/').pop();

  const commands = {
    'forward': () => car.forward(),
    'reverse': () => car.reverse(),
    'left': () => car.left(),
    'right': () => car.right(),
    'stop': () => car.stop()
  };

  if (commands[action]) {
    commands[action]();
    res.send({ action: action });
  } else {
    res.status(500).send({ error: 'No action called ' + action });
  }
}

module.exports = moveEndPoint;
