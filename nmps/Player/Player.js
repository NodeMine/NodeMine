'use strict';

let Vector3 = require('vec3');
var Spawn = function(playerList, player) {
  console.log(playerList);
  var player = playerList[player];
  var Vec3 = require("vec3");
  var serv = {};
  var PrisChunk = require('prismarine-chunk')('pe_1.0');
  serv.spawn = new Vec3(11, 60 + 1.62, 10);
      player.pos = new Vec3(11, 60 + 1.62, 10);
      player.yaw = 0;
      player.headYaw = 0;
      player.pitch = 0;
      player.speed = new Vec3(0, 0, 0);

      player.entity_id = [0,0];
      player.secret = "1m0AAMIFIgA=";

      player.hunger = 20;
      player.health = 200;
      player.isDead = false;
      player.spawned = false;

      player.user_permission = 2;
      player.global_permission = 2;
console.log("There");
      player.defaultMetadata = [
        {
          type: 0,
          key: 0,
          value: 0
        },
        {
          type: 1,
          key: 1,
          value: player.health + 100
        },
        {
          type: 4,
          key: 2,
          value: player.username
        },
        {
          type: 0,
          key: 3,
          value: 1
        },
        {
          type: 0,
          key: 4,
          value: 0
        },
        {
          type: 0,
          key: 15,
          value: 0
        },
        {
          type: 6,
          key: 17,
          value: {
            x: 0,
            y: 0,
            z: 0
          }
        }
      ];
      console.log("There");
      /*
      player.client.writeMCPE('player_status', {
        status: 0
      });

      player.client.writeMCPE('move_player', {
        entity_id: [0,-1],
        x: player.pos.x,
        y: player.pos.y + 1.62,
        z: player.pos.z,
        yaw: player.yaw,
        head_yaw: player.headYaw,
        pitch: player.pitch,
        mode: 0,
        on_ground: 1
      });

      player.client.writeMCPE('move_player', {
        entity_id: [0,-1],
        x: player.pos.x,
        y: player.pos.y + 1.62,
        z: player.pos.z,
        yaw: player.yaw,
        head_yaw: player.headYaw,
        pitch: player.pitch,
        mode: 0,
        on_ground: 1
      });

      player.client.writeMCPE('set_time', {
        time: 0,
        started: 1
      });

      player.client.writeMCPE('adventure_settings', {
        flags: 0,
        user_permission: player.user_permission,
        global_permission: player.global_permission
      })

      player.client.writeMCPE('respawn', {
        x: serv.spawn.x,
        y: serv.spawn.y,
        z: serv.spawn.z
      });

      player.client.on('request_chunk_radius', function(packet) {
        player.client.writeMCPE('chunk_radius_update', {
          chunk_radius: 1
        });

        function genLoginWorld (chunkX, chunkZ) {
            var chunk = new PrisChunk();

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

        for (var x = -2; x <=2; x++) {
         for (var z = -2; z <=2; z++) {
           var chunk = genLoginWorld(0,0);
          player.client.writeBatch([{"name":"mcpe","params":{name:"full_chunk_data",params:{
            chunk_x: x,
            chunk_z: z,
            order: 1,
            chunk_data: chunk.dump()
          }}}]);
         }
        }

        player.client.writeMCPE('player_status', {
          status: 3
        });

        player.client.writeMCPE('set_time', {
          time: 0,
          started: 1
        });

        player.spawned = true;
      });
      */

      player.client.writeMCPE('resource_packs_info', {
              mustAccept: false,
              behahaviorpackinfos: 0,
              resourcepackinfos: 0
          });
console.log("There");
          player.client.writeMCPE('start_game', {
            seed: -1,
            dimension: 0,
            generator: 1,
            gamemode: 1,
            difficulty: 0,
            entity_id: [0,-1],
            spawn_x: serv.spawn.x,
            spawn_y: serv.spawn.y,
            spawn_z: serv.spawn.z,
            spawn: {
                x: serv.spawn.x,
                y: serv.spawn.y,
                z: serv.spawn.z
            },
            x: player.pos.x,
            y: player.pos.y + 1.62,
            z: player.pos.z,
            unknown_1: {
                x: serv.spawn.x,
                y: serv.spawn.y
            },
            secret: player.secret,

            has_achievements_disabled: true,
            day_cycle_stop_time: -1,
            edu_mode: false,

            rain_level: 0,
            lightning_level: 0,

            enable_commands: true,
            is_texturepacks_required: false,
            world_name: 'temp_server',

          });
console.log("There");
          player.client.writeMCPE('set_spawn_position', {
            x: serv.spawn.x,
            y: serv.spawn.y,
            z: serv.spawn.z
          });
console.log("There");
          player.client.writeMCPE('set_time', {
              time: 0,
              started: true
          });
console.log("There");
          player.client.writeMCPE('adventure_settings', {
              flags: 0x040,
              user_permission: 3
          });
console.log("There");
          player.client.writeMCPE('player_status', {
              status: 3
          });
console.log("There");
          player.pos.x = 0;
console.log("There");
            player.client.writeMCPE('respawn', {
                x: 0,
                y: 25,
                z: 0
            });
console.log("There");
            player.client.writeMCPE('player_status', {
                status: 0
            });
console.log("There");
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
console.log("There");
          player.client.on('text', (packet) => {
            logger.info(packet);
          });
console.log("There");
          player.client.on('request_chunk_radius', (packet) => {
            //console.log(packet);
            //if (!player.connected_to_pc) {
                //sconsole.log(packet);
console.log("There");
            //Generate login world
            player.client.writeMCPE('chunk_radius_update', {
                chunk_radius: 22
            });
console.log("There");
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
console.log("There");
            player.client.writeMCPE('respawn', {
                x: 0,
                y: 25,
                z: 0
            });
console.log("There");
        for(i in playerList) {
          var target = playerList[i];
          console.log(target);
          if(target.uuid == player.uuid) {
            target.client.writeMCPE('add_player', {
              uuid: player.uuid,
              username: player.username,
              entity_id: player.entity_id,
              x: player.pos.x,
              y: player.pos.y,
              z: player.pos.z,
              speed_x: player.speed.x,
              speed_y: player.speed.y,
              speed_z: player.speed.z,
              yaw: player.yaw,
              head_yaw: player.headYaw,
              pitch: player.pitch,
              item: { block_id: 0 },
              metadata: player.defaultMetadata,
            });
          }
          console.log("There");

          // serv.log.info({
          //   uuid: player.uuid,
          //   username: player.name,
          //   entity_id: player.entity_id,
          //   x: player.pos.x,
          //   y: player.pos.y,
          //   z: player.pos.z,
          //   speed_x: player.speed.x,
          //   speed_y: player.speed.y,
          //   speed_z: player.speed.z,
          //   yaw: player.yaw,
          //   head_yaw: player.headYaw,
          //   pitch: player.pitch,
          //   item: { blockId: 0 }//,
          //   //metadata: player.defaultMetadata
          // });

          if(target.uuid != player.uuid) {
            player.client.writeMCPE('add_player', {
              uuid: target.uuid,
              username: target.username,
              entity_id: target.entity_id,
              x: target.pos.x,
              y: target.pos.y,
              z: target.pos.z,
              speed_x: target.speed.x,
              speed_y: target.speed.y,
              speed_z: target.speed.z,
              yaw: target.yaw,
              head_yaw: target.headYaw,
              pitch: target.pitch,
              item: { block_id: 0 },
              metadata: target.defaultMetadata
            });

            // serv.log.info({
            //   uuid: target.uuid,
            //   username: target.name,
            //   entity_id: target.entity_id,
            //   x: target.pos.x,
            //   y: target.pos.y,
            //   z: target.pos.z,
            //   speed_x: target.speed.x,
            //   speed_y: target.speed.y,
            //   speed_z: target.speed.z,
            //   yaw: target.yaw,
            //   head_yaw: target.headYaw,
            //   pitch: target.pitch,
            //   item: { blockId: 0 }//,
            //   //metadata: target.defaultMetadata
            // });
          }
        };
console.log("There");
      /*
      serv.log.info(player.name + '[/' + player._client.socket.address().address + ':' + player._client.socket.address().port + '] logged in with entity id ' + player.entity_id); // pretty sure that's broken
      serv.log.info(player.name + ' joined the game');

      serv.broadcast(serv.color.yellow + player.name + ' has joined the game');

      serv.entityID++;
      serv.onlinePlayers++;
      */
      player.client.writeMCPE('player_status', {
          status: 3
      });
      console.log("There");
})
};

function Player () {
    this.secret     = null;
    this.uuid       = null;
    this.id         = null;
    this.teleportId = null;

    this.username   = null;

    this.prefix     = '<';
    this.suffix     = '>';
    this.formatedUsername = null;

    this.pos        = new Vector3(0, 0, 0);
    this.speed      = new Vector3(0, 0, 0);

    this.hunger     = 0;
    this.health     = 0;
    this.dimension  = 0;
    this.gameMode   = 0;
    this.hidden     = false;

    //Test
    this.world = null;
    this.Spawn = Spawn;
}

module.exports = Player;
