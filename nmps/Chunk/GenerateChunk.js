'use strict';

module.exports = {
  generateChunk: function(chunkX, chunkY) {
    var Vector3 = require("vec3");
    var PrisChunk = require("prismarine-chunk")('pe_1.0');
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
}
