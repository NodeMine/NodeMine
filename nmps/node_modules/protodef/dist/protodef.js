'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./utils');

var getFieldInfo = _require.getFieldInfo;
var tryCatch = _require.tryCatch;

var reduce = require('lodash.reduce');

function isFieldInfo(type) {
  return typeof type === "string" || Array.isArray(type) && typeof type[0] === "string" || type.type;
}

function findArgs(acc, v, k) {
  if (typeof v === "string" && v.charAt(0) === '$') acc.push({ "path": k, "val": v.substr(1) });else if (Array.isArray(v) || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object") acc = acc.concat(reduce(v, findArgs, []).map(function (v) {
    return { "path": k + "." + v.path, "val": v.val };
  }));
  return acc;
}

function setField(path, val, into) {
  var c = path.split('.').reverse();
  while (c.length > 1) {
    into = into[c.pop()];
  }
  into[c.pop()] = val;
}

function extendType(functions, defaultTypeArgs) {
  var json = JSON.stringify(defaultTypeArgs);
  var argPos = reduce(defaultTypeArgs, findArgs, []);
  function produceArgs(typeArgs) {
    var args = JSON.parse(json);
    argPos.forEach(function (v) {
      setField(v.path, typeArgs[v.val], args);
    });
    return args;
  }
  return [function read(buffer, offset, typeArgs, context) {
    return functions[0].call(this, buffer, offset, produceArgs(typeArgs), context);
  }, function write(value, buffer, offset, typeArgs, context) {
    return functions[1].call(this, value, buffer, offset, produceArgs(typeArgs), context);
  }, function sizeOf(value, typeArgs, context) {
    if (typeof functions[2] === "function") return functions[2].call(this, value, produceArgs(typeArgs), context);else return functions[2];
  }];
}

var ProtoDef = function () {
  function ProtoDef() {
    _classCallCheck(this, ProtoDef);

    this.types = {};
    this.addDefaultTypes();
  }

  _createClass(ProtoDef, [{
    key: 'addDefaultTypes',
    value: function addDefaultTypes() {
      this.addTypes(require("./datatypes/numeric"));
      this.addTypes(require("./datatypes/utils"));
      this.addTypes(require("./datatypes/structures"));
      this.addTypes(require("./datatypes/conditional"));
    }
  }, {
    key: 'addType',
    value: function addType(name, functions) {
      if (functions === "native") return;
      if (isFieldInfo(functions)) {
        var _getFieldInfo = getFieldInfo(functions);

        var type = _getFieldInfo.type;
        var typeArgs = _getFieldInfo.typeArgs;

        this.types[name] = extendType(this.types[type], typeArgs);
      } else this.types[name] = functions;
    }
  }, {
    key: 'addTypes',
    value: function addTypes(types) {
      var _this = this;

      Object.keys(types).forEach(function (name) {
        return _this.addType(name, types[name]);
      });
    }
  }, {
    key: 'read',
    value: function read(buffer, cursor, _fieldInfo, rootNodes) {
      var _getFieldInfo2 = getFieldInfo(_fieldInfo);

      var type = _getFieldInfo2.type;
      var typeArgs = _getFieldInfo2.typeArgs;

      var typeFunctions = this.types[type];
      if (!typeFunctions) throw new Error("missing data type: " + type);
      return typeFunctions[0].call(this, buffer, cursor, typeArgs, rootNodes);
    }
  }, {
    key: 'write',
    value: function write(value, buffer, offset, _fieldInfo, rootNode) {
      var _getFieldInfo3 = getFieldInfo(_fieldInfo);

      var type = _getFieldInfo3.type;
      var typeArgs = _getFieldInfo3.typeArgs;

      var typeFunctions = this.types[type];
      if (!typeFunctions) throw new Error("missing data type: " + type);
      return typeFunctions[1].call(this, value, buffer, offset, typeArgs, rootNode);
    }
  }, {
    key: 'sizeOf',
    value: function sizeOf(value, _fieldInfo, rootNode) {
      var _getFieldInfo4 = getFieldInfo(_fieldInfo);

      var type = _getFieldInfo4.type;
      var typeArgs = _getFieldInfo4.typeArgs;

      var typeFunctions = this.types[type];
      if (!typeFunctions) {
        throw new Error("missing data type: " + type);
      }
      if (typeof typeFunctions[2] === 'function') {
        return typeFunctions[2].call(this, value, typeArgs, rootNode);
      } else {
        return typeFunctions[2];
      }
    }
  }, {
    key: 'createPacketBuffer',
    value: function createPacketBuffer(type, packet) {
      var _this2 = this;

      var length = tryCatch(function () {
        return _this2.sizeOf(packet, type, {});
      }, function (e) {
        e.message = 'SizeOf error for ' + e.field + ' : ' + e.message;
        throw e;
      });
      var buffer = new Buffer(length);
      tryCatch(function () {
        return _this2.write(packet, buffer, 0, type, {});
      }, function (e) {
        e.message = 'Write error for ' + e.field + ' : ' + e.message;
        throw e;
      });
      return buffer;
    }
  }, {
    key: 'parsePacketBuffer',
    value: function parsePacketBuffer(type, buffer) {
      var _this3 = this;

      var _tryCatch = tryCatch(function () {
        return _this3.read(buffer, 0, type, {});
      }, function (e) {
        e.message = 'Read error for ' + e.field + ' : ' + e.message;
        throw e;
      });

      var value = _tryCatch.value;
      var size = _tryCatch.size;

      return {
        data: value,
        metadata: {
          size: size
        },
        buffer: buffer.slice(0, size)
      };
    }
  }]);

  return ProtoDef;
}();

module.exports = ProtoDef;
//# sourceMappingURL=maps/protodef.js.map
