'use strict';

var pmp = require('pocket-minecraft-protocol');
const util = require('util')
var Vector3 = require("vec3");
var fs = require("fs");
var processConfig =  require("./nmps/Config/processConfig.js");
var logger = require("./nmps/Console/Console.js");
var gfs = require("./nmps/Utils/GetFileSync.js");
var io = require("./nmps/Console/IO.js");
var Io = new io();
var events = require("./nmps/Events/EventEmitter.js");
var PrisChunk = require('prismarine-chunk')('pe_1.0');
var commandParser = require("./nmps/Command/CommandParser.js");
var commandManager = require("./nmps/Command/CommandManager.js");
var Player = require("./nmps/Player/Player.js");
commandManager = new commandManager();
commandParser = new commandParser();
var loader = require("./nmps/Command/CommandsLoader.js");
let Vec3 = require('vec3');
loader = new loader();


var serverList = [];
var entityId = 0;
var players = [];

var playerList = {};


playerList["players"] = {};
playerList["list"] = [];
playerList["uuid"] = [];
//var newChunk = chunk.generateChunk();

logger.info("Starting NMPS...");

logger.info("\n"+gfs.getFileSync("./internal/startup.txt"));
logger.info("Loading NMPS config...");

var config = processConfig.processConfig(gfs.getFileSync("./configs/nmps.conf"));

logger.info("Loaded!");

logger.info("Initializing server...");

var server = pmp.createServer({
  host: config.Host,
  port: parseInt(config.Port),
  name: 'MCPE;'+config.Name+';81 81;1.0.0;0;'+config.Slots
});

logger.info("Server online at "+config.Host+":"+config.Port);

function genLoginWorld (chunkX, chunkZ) {
    let chunk = new PrisChunk();

    var x, y, z;
    for (x = 0; x < 16; x++) {
        for (z = 0; z < 16; z++) {

            //Bedrock layer
            chunk.setBlockType(new Vector3(x, 0, z), 3);
            chunk.setSkyLight(new Vector3(x, 0, z), 15);
            chunk.setBlockType(new Vector3(x, 1, z), 2);
            chunk.setSkyLight(new Vector3(x, 1, z), 15);

            //Air layer
            continue;
            for (y = 2; y < 256; y++) {
                chunk.setSkyLight(new Vector3(x, y, z), 15);
                //chunk.setBlockLight(new Vector3(x, y, z), 15);
                chunk.setBiomeColor(new Vector3(x, y, z), 141, 184, 113);
            }
        }
    }

    return chunk;
}

server.on('connection', function(client) {

//client.on("mcpe",packet => console.log(packet, false));

  var player = new Player();
  player.client = client;

  player.client.on("mcpe_login",packet => {

    if (packet.protocol !== 100) {
      if (packet.protocol > 100) {
          return client.writeMCPE('player_status', {
            status: 2
          });
        } else {
          return client.writeMCPE('player_status', {
            status: 1
          });
        }
    }

    if (packet.username == null) {
        log('A Player with null as username tried to connect!', 1);
        return client.writeMCPE('disconnect', {
            message: 'Username cannot be null'
        });
    }

    player.uuid = packet.uuid;
    player.id = packet.id;
    player.entity_id = entityId;
    player.username = packet.username;
    player.formatedUsername = player.username;
    player.skinData = packet.skinData;
    player.skinId = packet.skinId;
    player.skin = {skin_type: packet.skinId, texture: new Buffer(packet.skinData, 'base64') }
    player.pos = new Vec3(11, 20 + 1.62, 10);
    player.yaw = 0;
    player.headYaw = 0;
    player.pitch = 0;
    player.speed = new Vec3(0, 0, 0);

    players.push(player);

    // playerList["players"][player.username] = player;
    // playerList["list"].push(player.username);
    // playerList["add"]= [];

    serverList.push({
      clientUuid: player.uuid,
      entityId: player.entity_id,
      displayName: player.username,
      skin: player.skin
    });

    player.Spawn(serverList, player, players);
    console.log(serverList);
    console.log("==============")
    console.log(players);
    console.log("==============")

    entityId++;

    /*
    player.client.writeMCPE('resource_packs_info', {
            mustAccept: false,
            behahaviorpackinfos: 0,
            resourcepackinfos: 0
        });

        player.client.writeMCPE('start_game', {
            entity_id: [0, 0],
            runtime_entity_id: [0, 0],
            x: 0, y: 10 + 1.62, z: 0,
            unknown_1: {
                x: 15,
                y: 25
            },
            seed: 12345,
            dimension: 0,
            generator: 2,
            gamemode: 1,
            difficulty: 0,

            spawn: {
                x: 0,
                y: 10 + 1.62,
                z: 0
            },

            has_achievements_disabled: true,
            day_cycle_stop_time: -1,
            edu_mode: false,

            rain_level: 0,
            lightning_level: 0,

            enable_commands: true,
            is_texturepacks_required: false,
            secret: '1m0AAMIFIgA=',
            world_name: 'temp_server'
        });

        player.client.writeMCPE('set_time', {
            time: 0,
            started: true
        });

        player.client.writeMCPE('adventure_settings', {
            flags: 0x040,
            user_permission: 3
        });

        player.client.writeMCPE('player_status', {
            status: 3
        });

        player.pos.x = 0;

          player.client.writeMCPE('respawn', {
              x: 0,
              y: 25,
              z: 0
          });

          player.client.writeMCPE('player_status', {
              status: 3
          });

          player.client.on('move_player', (packet) => {
            //console.log(packet);
            if (!player.pos.x || player.pos.x === 0)
                return;

            player.pos.x = packet.x;
            player.pos.y = packet.y;
            player.pos.z = packet.z;

            player.yaw = packet.yaw;
            player.head_yaw = packet.head_yaw;
            player.pitch = packet.pitch;

            player.client_pc.write('position_look', {
                x: player.pos.x,
                y: player.pos.y - 1.62,
                z: player.pos.z,

                yaw: player.yaw,
                pitch: player.pitch,
                flags: 0x00,
                teleportId: player.teleportId,
            });
        });

        player.client.on('text', (packet) => {
          logger.info(packet);
        });
        */
        events.on("SEND_MESSAGE", function(data){
          player.client.writeMCPE('text', {
            type: 1,
            source: data,
            message: ""
          });
        });
        events.on("PLAYER_LIST_UPDATE", function(newList){
          playerList = newList;
        });
        events.on("GET_PLAYER_LIST", function(){
          events.emit("PLAYER_LIST", playerList);
        });
        /*
        player.client.on('request_chunk_radius', (packet) => {
          //console.log(packet);
          //if (!player.connected_to_pc) {
              //sconsole.log(packet);

          //Generate login world
          player.client.writeMCPE('chunk_radius_update', {
              chunk_radius: 22
          });

          for (let x = -2; x <= 2; x++) {
              for (let z = -2; z <= 2; z++) {
                  var chunk = genLoginWorld(x, z);
                  player.client.writeBatch([{name: 'full_chunk_data', params: {
                      chunk_x: x,
                      chunk_z: z,
                      chunk_data: chunk.dump()
                  }}]);
              }
          }
          //return;

          player.client.writeMCPE('respawn', {
              x: 0,
              y: 25,
              z: 0
          });

          player.client.writeMCPE('player_status', {
              status: 3
          });
        });
        */
      });
    });
