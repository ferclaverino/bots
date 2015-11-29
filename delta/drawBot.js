var temporal = require("temporal");

function DrawBot(deltaBot, height) {
  var delay = 1000;

  function go(x, y, z) {
    deltaBot.go(x, y , z, delay)
  }

  function draw(points, ms) {
    var drawQueue = points.map(function(point, index) {
      var taskDelay = ms || delay;
      if (index == 0) {
        taskDelay = 0;
      } else if (index == 1) {
        taskDelay = delay;
      }
      return {
        delay: taskDelay,
        task: function() {
          go (point.x, point.y, 0, delay);
        }
      }
    });

    drawQueue.push({ delay: delay * 2, task: init })
    temporal.queue(drawQueue);
  }

  function init() {
    go(0, 0, height);
  }

  function point(x, y) {
    draw([{
      x: x || 0,
      y: y || 0
    }]);
  }

  function box(l) {
    l = l || 50;
    draw([
      {x:  l, y:  l},
      {x:  l, y: -l},
      {x: -l, y: -l},
      {x: -l, y:  l},
      {x:  l, y:  l},
    ]);
  }

  function circle(r) {
    r = r || 20;
    var points = [];
    for (var angle = 0; angle < 360; angle = angle + 10) {
      x = r * Math.cos(angle * Math.PI / 180);
      y = r * Math.sin(angle * Math.PI / 180);
      points.push({x: x, y: y});
    }
    draw(points, 250);
  }

  function face() {
    point(10, 10);

    setTimeout(function() {
      point(-10, -10);
    }, delay * 5);

    setTimeout(function() {
      circle(30);
    }, delay * 10);
  }

  return {
    init: init,
    point: point,
    box: box,
    circle: circle,
    face: face
  };
}

module.exports = DrawBot;
