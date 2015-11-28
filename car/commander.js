var keypress = require('keypress');

function Comander(car, tilt) {
  var duplicatedKeyPress = false;
  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  function listen(commands) {
    process.stdin.on('keypress', function(ch, key) {
      if (duplicatedKeyPress) {
        duplicatedKeyPress = false;
        return;
      } else {
        duplicatedKeyPress = true;
      }

      if (!key) {
        return;
      }

      if (key.name === 'q') {
        process.exit();
      } else {
        if (commands[key.name]) commands[key.name]();
      }
    });
  }

  return {
    listen: listen
  };
}

module.exports = Comander;
