'use strict';

function captureEndPoint(req, res, camera) {
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  camera.capture().pipe(res);
}

module.exports = captureEndPoint;
