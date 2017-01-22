var processConfig =  require("../Config/processConfig.js");
var gfs = require("../Utils/GetFileSync.js");
var logger = require("../Console/Console.js");
var config = processConfig.processConfig(gfs.getFileSync("./configs/nmps.conf"));
var events = require("../Events/EventEmitter.js");
events.on("COMMAND", function(command, args){
  if(command == "info") {
    logger.info("====================\nServer info:\nName: "+config.Name+"\nHost: "+config.Host+"\nPort: "+config.Port"\nSlots: "+config.Slots+"====================");
  }
});
