var ProtoDef = require('protodef').ProtoDef;
var Serializer = require('protodef').Serializer;
var Parser = require('protodef').Parser;

function createProtocol() {
  var proto = new ProtoDef();

  proto.addTypes(require('../datatypes/raknet'));
  proto.addTypes(require('../../data/protocol.json').types);

  return proto;
}

function createSerializer() {
  return new Serializer(createProtocol(), 'special_packet');
}

function createDeserializer() {
  return new Parser(createProtocol(), 'special_packet');
}

module.exports = {
  createDeserializer: createDeserializer,
  createSerializer: createSerializer
}
