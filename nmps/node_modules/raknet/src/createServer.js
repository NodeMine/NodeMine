'use strict';

var Server = require('./server');

function createServer(options) {
  options = options || {};
  const port = options.port != null ?
    options.port :
    options['server-port'] != null ?
      options['server-port'] :
      19132;

  const host = options.host || '0.0.0.0';
  const customPackets = options.customPackets || {};
  const customTypes = options.customTypes || {};
  const serverId= options.serverID || [ 339724, -6627871 ];
  const kickTimeout = options.kickTimeout || 30 * 1000;

  const server = new Server(customPackets,customTypes);

  server.serverID=serverId;
  server.name=options.name || "MCPE;A Minecraft server;45 45;0.0.1;0;20";

  const maxMtuSize=1464;

  server.on("connection", function (client) {
    let kickTimer=null;

    client.on("open_connection_request_1",(packet) => {
      client.write("open_connection_reply_1",{
        magic:0,
        serverID:server.serverID,
        serverSecurity:0,
        mtuSize:packet.mtuSize.length+46
      })
    });


    client.on("open_connection_request_2",packet => {
      client.mtuSize=Math.min(Math.abs(packet.mtuSize), maxMtuSize);
      client.write("open_connection_reply_2",
        {
          magic: 0,
          serverID: server.serverID,
          clientAddress: { version: 4, address: client.address, port: client.port },
          mtuSize: packet.mtuSize,
          serverSecurity: 0
        });
    });

    client.on("client_connect",packet => {
      const addresses=[];
      for(let i=0;i<10;i++) addresses.push({ version: 4, address: server.address, port: server.port });
      client.writeEncapsulated("server_handshake",{
        clientAddress:{ version: 4, address: client.address, port: client.port },
        serverSecurity:0,
        systemAddresses:addresses,
        sendPing:packet.sendPing,
        sendPong:[packet.sendPing[0],packet.sendPing[1]+1000]
      },{priority:0})
    });

    client.on("client_handshake",packet => {
      client.emit("login");
    });

    client.on("ping",packet => {
      if(kickTimer)
        clearTimeout(kickTimer);
      client.writeEncapsulated("pong",{
        "pingID":packet.pingID
      });
      kickTimer=setTimeout(() => client.end(),kickTimeout);
    });

    client.on('unconnected_ping', function(packet) {
      client.write('unconnected_pong', {
        pingID: packet.pingID,
        serverID: server.serverID,
        magic: 0,
        serverName: server.name
      });
    });

    client.on('client_disconnect',() => {
      client.end();
    });

    client.on('end',() => {
      if(kickTimer)
        clearTimeout(kickTimer);
    })

  });

  server.listen(port, host);
  return server;
}

module.exports = createServer;