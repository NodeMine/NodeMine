'use strict';

var _require = require("../utils");

var getField = _require.getField;
var getCount = _require.getCount;
var sendCount = _require.sendCount;
var calcCount = _require.calcCount;
var tryDoc = _require.tryDoc;


module.exports = {
  'array': [readArray, writeArray, sizeOfArray],
  'count': [readCount, writeCount, sizeOfCount],
  'container': [readContainer, writeContainer, sizeOfContainer]
};

function readArray(buffer, offset, typeArgs, rootNode) {
  var _this = this;

  var results = {
    value: [],
    size: 0
  };
  var value;

  var _getCount$call = getCount.call(this, buffer, offset, typeArgs, rootNode);

  var count = _getCount$call.count;
  var size = _getCount$call.size;

  offset += size;
  results.size += size;
  for (var i = 0; i < count; i++) {
    var _tryDoc = tryDoc(function () {
      return _this.read(buffer, offset, typeArgs.type, rootNode);
    }, i);

    size = _tryDoc.size;
    value = _tryDoc.value;

    results.size += size;
    offset += size;
    results.value.push(value);
  }
  return results;
}

function writeArray(value, buffer, offset, typeArgs, rootNode) {
  var _this2 = this;

  offset = sendCount.call(this, value.length, buffer, offset, typeArgs, rootNode);
  return value.reduce(function (offset, v, index) {
    return tryDoc(function () {
      return _this2.write(v, buffer, offset, typeArgs.type, rootNode);
    }, index);
  }, offset);
}

function sizeOfArray(value, typeArgs, rootNode) {
  var _this3 = this;

  var size = calcCount.call(this, value.length, typeArgs, rootNode);
  size = value.reduce(function (size, v, index) {
    return tryDoc(function () {
      return size + _this3.sizeOf(v, typeArgs.type, rootNode);
    }, index);
  }, size);
  return size;
}

function readContainer(buffer, offset, typeArgs, context) {
  var _this4 = this;

  var results = {
    value: { "..": context },
    size: 0
  };
  typeArgs.forEach(function (_ref) {
    var type = _ref.type;
    var name = _ref.name;
    var anon = _ref.anon;

    tryDoc(function () {
      var readResults = _this4.read(buffer, offset, type, results.value);
      results.size += readResults.size;
      offset += readResults.size;
      if (anon) {
        if (readResults.value !== undefined) Object.keys(readResults.value).forEach(function (key) {
          results.value[key] = readResults.value[key];
        });
      } else results.value[name] = readResults.value;
    }, name ? name : "unknown");
  });
  delete results.value[".."];
  return results;
}

function writeContainer(value, buffer, offset, typeArgs, context) {
  var _this5 = this;

  value[".."] = context;
  offset = typeArgs.reduce(function (offset, _ref2) {
    var type = _ref2.type;
    var name = _ref2.name;
    var anon = _ref2.anon;
    return tryDoc(function () {
      return _this5.write(anon ? value : value[name], buffer, offset, type, value);
    }, name ? name : "unknown");
  }, offset);
  delete value[".."];
  return offset;
}

function sizeOfContainer(value, typeArgs, context) {
  var _this6 = this;

  value[".."] = context;
  var size = typeArgs.reduce(function (size, _ref3) {
    var type = _ref3.type;
    var name = _ref3.name;
    var anon = _ref3.anon;
    return size + tryDoc(function () {
      return _this6.sizeOf(anon ? value : value[name], type, value);
    }, name ? name : "unknown");
  }, 0);
  delete value[".."];
  return size;
}

function readCount(buffer, offset, _ref4, rootNode) {
  var type = _ref4.type;

  return this.read(buffer, offset, type, rootNode);
}

function writeCount(value, buffer, offset, _ref5, rootNode) {
  var countFor = _ref5.countFor;
  var type = _ref5.type;

  // Actually gets the required field, and writes its length. Value is unused.
  // TODO : a bit hackityhack.
  return this.write(getField(countFor, rootNode).length, buffer, offset, type, rootNode);
}

function sizeOfCount(value, _ref6, rootNode) {
  var countFor = _ref6.countFor;
  var type = _ref6.type;

  // TODO : should I use value or getField().length ?
  return this.sizeOf(getField(countFor, rootNode).length, type, rootNode);
}
//# sourceMappingURL=../maps/datatypes/structures.js.map
