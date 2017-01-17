module.exports = function() {
  var fs = require("fs");
  var commands = fs.readdirSync("./nmps/Commands");
  for(i in commands) {
    require("../Commands/"+commands[i]);
  }
}
