var commands = require("../Data/commands.json");
var logger = require("../Console/Console.js");
var events = require("../Events/EventEmitter.js");

events.on("COMMAND", function(command, args) {
    if (command == "help") {
        for (i in commands) {
            logger.info("/" + i + ":\n\t\t  " + commands[i]["help"] + "\n\t\t  " + commands[i]["role"]);
        }
    }
});
