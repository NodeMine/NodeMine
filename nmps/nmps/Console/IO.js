module.exports = function() {
  var events = require("../Events/EventEmitter.js");

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (text) {
    events.emit("CONSOLE_INPUT", text);
  });

}
