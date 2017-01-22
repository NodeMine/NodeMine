module.exports = {
  getFileSync: function(file,options) {
    var fs = require("fs");
    if(options == undefined || options == null) {
      return fs.readFileSync(file).toString();
    }else{
      return fs.readFileSync(file, options).toString();
    }
  }
}
