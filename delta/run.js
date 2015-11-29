var five = require("johnny-five");
var DeltaModel = require("./deltaModel.js");
var DeltaBot = require("./deltaBot.js");

var board = new five.Board({
  port: "/dev/rfcomm0"
});

// Delta Geometry - put your measurements here!
var //e = 80.25,
    e = 25,
    //f = 163,
    f = 64 * 2,
    //re = 155,
    re = 238,
    //rf = 128.75;
    rf = 105;
var deltaModel = new DeltaModel(e, f, re, rf);

board.on("ready", function() {
  var deltaBot = new DeltaBot(deltaModel);
  board.repl.inject({ d: deltaBot });
});
