var five = require('johnny-five');
var PlotModel = require('./plotModel.js');
var PlotBot = require('./plotBot.js');
var board = new five.Board({
  // port: '/dev/rfcomm0'
});

var plotModel = new PlotModel();

board.on('ready', function() {
  var plotBot = new PlotBot(plotModel, 4, 3, 20, 28);
  board.repl.inject({
    p: plotBot
  });
});
