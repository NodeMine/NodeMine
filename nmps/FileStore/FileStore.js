module.exports = {
  store: function(data, name, catagory) {
    var fileExists = require('file-exists');
    var fs = require("fs");
    var logger = require("./nmps/Console/Console.js");
    if(fileExists("./data.json")) {
      var json = JSON.stringify(data);
      //FIXME: Make async!
      var file = fs.readFileSync("./data.json");
      file = JSON.parse(JSON.stringify(file));
      file[name] = {};
      file[name][catagory] = json;
      fs.writeFile("./data.json", file, function(err) {
        if(err) {
            return logger.warn("[FileStore] "+err);
        }
      });
    }else{
      fs.closeSync(fs.openSync("./data.json", 'w'));
      this.store(data);
    }
  },

  retrieve: function(name) {
    var fileExists = require('file-exists');
    var fs = require("fs");
    var logger = require("./nmps/Console/Console.js");
    if(fileExists("./data.json")) {

    }else{
      logger.warn("[FileStore] No data file exists. Please make sure to set a value before retrieving it!");
    }
  }
}
