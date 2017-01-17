module.exports = {
  processConfig: function(configInput) {
    var config = configInput.split(";");
    var processedConfig = {};
    for(i in config) {
      var entry = config[i].split("=>");
      var name = entry[0];
      entry = entry[1];
      processedConfig[name.trim()] = entry.trim();
    }
    return processedConfig;
  }
}
