module.exports = {
  _writeAll: function(packetName, packetFields) {
    var events = require("../Events/EventEmitter.js");
    events.emit("GET_PLAYER_LIST");
    events.on("PLAYER_LIST",function(list) {
      list.list.forEach(function(player) {
        player = list.players[player];
        player.client.writeMCPE(packetName, packetFields);
      });
    });
  }
}
