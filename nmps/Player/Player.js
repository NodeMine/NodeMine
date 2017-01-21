'use strict';

let Vec3 = require('vec3');
let Vector3 = Vec3;
var crypto = require("crypto");
var chunk = require("../Chunk/GenerateChunk.js");
var all = require("../Utils/All.js");
var Spawn = function(playerList, player) {
  var serv = {};
  serv.spawn = new Vec3(11, 20 + 1.62, 10);

    player.pos = serv.spawn;
    player.yaw = 0;
    player.headYaw = 0;
    player.pitch = 0;
    player.speed = new Vec3(0, 0, 0);

    player.entity_id = [0, 0];
    var token = crypto.randomBytes(64).toString('hex');
    player.secret = token;

    player.hunger = 20;
    player.health = 200;
    player.isDead = false;
    player.spawned = false;

    player.user_permission = 2;
    player.global_permission = 2;

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

    playerList[player.username] = player;

    player.client.writeMCPE('player_status', {
      status: 0
    });

    player.client.writeMCPE('resource_packs_info', {
            mustAccept: false,
            behahaviorpackinfos: 0,
            resourcepackinfos: 0
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
        secret: player.secret,
        world_name: 'temp_server'
    });

    player.client.writeMCPE('set_spawn_position', {
      x: serv.spawn.x,
      y: serv.spawn.y,
      z: serv.spawn.z
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

    player.client.writeMCPE('respawn', {
        x: 0,
        y: 25,
        z: 0
    });

    player.client.writeMCPE('set_spawn_position', {
      x: serv.spawn.x,
      y: serv.spawn.y,
      z: serv.spawn.z
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

    player.client.writeMCPE('respawn', {
      x: serv.spawn.x,
      y: serv.spawn.y,
      z: serv.spawn.z
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
    });

    player.client.on('request_chunk_radius', function(packet) {
      player.client.writeMCPE('chunk_radius_update', {
        chunk_radius: 1
      });

      for (let x = -2; x <=2; x++) {
       for (let z = -2; z <=2; z++) {
         var newChunk = chunk.generateChunk(x,z);
        player.client.writeBatch([{name: 'full_chunk_data', params: {
          chunk_x: x,
          chunk_z: z,
          order: 1,
          chunk_data: newChunk.dump()
        }}]);
       }
      }

      player.client.writeMCPE('respawn', {
          x: player.pos.x,
          y: player.pos.y,
          z: player.pos.z
      });

      player.client.writeMCPE('player_status', {
          status: 3
      });

      player.spawned = true;
    });

    setTimeout(function() {
      all._writeAll('player_list', {
        type: 0,
        entries: playerList.uuid
      });
      playerList["list"].forEach(function(index) {
        var target = playerList["players"][index];
        if(target.uuid == player.uuid) {
          player.client.writeMCPE('add_player', {
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
        if(target.uuid != player.uuid) {
          target.client.writeMCPE('add_player', {
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

        }
      });
    }, 900);

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
