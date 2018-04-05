'use strict';

function streamEndPoint(req, res, camera) {
  res.redirect(camera.url);
}

module.exports = streamEndPoint;
