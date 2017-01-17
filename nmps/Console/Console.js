var colors = require("../Chat/Colors.js");
colors = new colors();
var log = console.log;
console.log = function(message, logtrue) {
  if(logtrue === false || logtrue == undefined) {
    log(message);
  }else{
    var timestamp = require("../Time/Time.js");
    log("[" + timestamp.getTimestamp() + "][INFO] " + message);
  }
}

module.exports = {
  info: function(message) {
    var timestamp = require("../Time/Time.js");
    console.log("[" + timestamp.getTimestamp() + "][INFO] " + message);
  },

  warn: function(message) {
    var timestamp = require("../Time/Time.js");
    console.log(colors.terminal.yellow.bold("[" + timestamp.getTimestamp() + "][WARNING] " + message));
  },

  critical: function(message) {
    var timestamp = require("../Time/Time.js");
    console.log(colors.terminal.bgRed.bold("[" + timestamp.getTimestamp() + "][CRITICAL] " + message));
  },

  error: function(error, info) {
    var timestamp = require("../Time/Time.js");
    var errorMessage = require("../Error/ErrorManager");
    console.log(colors.terminal.red.bold("[" + timestamp.getTimestamp() + "][ERROR] " + errorMessage.getMessageFromError(error, info)));
  }
}
