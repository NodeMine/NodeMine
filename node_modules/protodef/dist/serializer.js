"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transform = require("readable-stream").Transform;

var _require = require('./utils');

var PartialReadError = _require.PartialReadError;

var Serializer = function (_Transform) {
  _inherits(Serializer, _Transform);

  function Serializer(proto, mainType) {
    _classCallCheck(this, Serializer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Serializer).call(this, { writableObjectMode: true }));

    _this.proto = proto;
    _this.mainType = mainType;
    _this.queue = new Buffer(0);
    return _this;
  }

  _createClass(Serializer, [{
    key: "createPacketBuffer",
    value: function createPacketBuffer(packet) {
      return this.proto.createPacketBuffer(this.mainType, packet);
    }
  }, {
    key: "_transform",
    value: function _transform(chunk, enc, cb) {
      var buf = void 0;
      try {
        buf = this.createPacketBuffer(chunk);
      } catch (e) {
        return cb(e);
      }
      this.push(buf);
      return cb();
    }
  }]);

  return Serializer;
}(Transform);

var Parser = function (_Transform2) {
  _inherits(Parser, _Transform2);

  function Parser(proto, mainType) {
    _classCallCheck(this, Parser);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Parser).call(this, { readableObjectMode: true }));

    _this2.proto = proto;
    _this2.mainType = mainType;
    _this2.queue = new Buffer(0);
    return _this2;
  }

  _createClass(Parser, [{
    key: "parsePacketBuffer",
    value: function parsePacketBuffer(buffer) {
      return this.proto.parsePacketBuffer(this.mainType, buffer);
    }
  }, {
    key: "_transform",
    value: function _transform(chunk, enc, cb) {
      this.queue = Buffer.concat([this.queue, chunk]);
      while (true) {
        var packet = void 0;
        try {
          packet = this.parsePacketBuffer(this.queue);
        } catch (e) {
          if (e.partialReadError) return cb();else {
            e.buffer = this.queue;
            this.queue = new Buffer(0);
            return cb(e);
          }
        }

        this.push(packet);
        this.queue = this.queue.slice(packet.metadata.size);
      }
    }
  }]);

  return Parser;
}(Transform);

module.exports = {
  Serializer: Serializer,
  Parser: Parser
};
//# sourceMappingURL=maps/serializer.js.map
