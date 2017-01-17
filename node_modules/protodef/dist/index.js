"use strict";

var ProtoDef = require("./protodef");
var proto = new ProtoDef();

module.exports = {
  ProtoDef: ProtoDef,
  Serializer: require("./serializer").Serializer,
  Parser: require("./serializer").Parser,
  types: proto.types,
  utils: require("./utils")
};
//# sourceMappingURL=maps/index.js.map
