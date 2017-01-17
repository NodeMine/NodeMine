'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils');

var getField = _require.getField;
var getFieldInfo = _require.getFieldInfo;
var tryDoc = _require.tryDoc;
var PartialReadError = _require.PartialReadError;


module.exports = {
  'switch': [readSwitch, writeSwitch, sizeOfSwitch],
  'option': [readOption, writeOption, sizeOfOption]
};

function readSwitch(buffer, offset, _ref, rootNode) {
  var _this = this;

  var compareTo = _ref.compareTo;
  var fields = _ref.fields;
  var compareToValue = _ref.compareToValue;

  var rest = _objectWithoutProperties(_ref, ['compareTo', 'fields', 'compareToValue']);

  compareTo = compareToValue !== undefined ? compareToValue : getField(compareTo, rootNode);
  if (typeof fields[compareTo] === 'undefined' && typeof rest.default === "undefined") throw new Error(compareTo + " has no associated fieldInfo in switch");

  var caseDefault = typeof fields[compareTo] === 'undefined';
  var resultingType = caseDefault ? rest.default : fields[compareTo];
  var fieldInfo = getFieldInfo(resultingType);
  return tryDoc(function () {
    return _this.read(buffer, offset, fieldInfo, rootNode);
  }, caseDefault ? "default" : compareTo);
}

function writeSwitch(value, buffer, offset, _ref2, rootNode) {
  var _this2 = this;

  var compareTo = _ref2.compareTo;
  var fields = _ref2.fields;
  var compareToValue = _ref2.compareToValue;

  var rest = _objectWithoutProperties(_ref2, ['compareTo', 'fields', 'compareToValue']);

  compareTo = compareToValue !== undefined ? compareToValue : getField(compareTo, rootNode);
  if (typeof fields[compareTo] === 'undefined' && typeof rest.default === "undefined") throw new Error(compareTo + " has no associated fieldInfo in switch");

  var caseDefault = typeof fields[compareTo] === 'undefined';
  var fieldInfo = getFieldInfo(caseDefault ? rest.default : fields[compareTo]);
  return tryDoc(function () {
    return _this2.write(value, buffer, offset, fieldInfo, rootNode);
  }, caseDefault ? "default" : compareTo);
}

function sizeOfSwitch(value, _ref3, rootNode) {
  var _this3 = this;

  var compareTo = _ref3.compareTo;
  var fields = _ref3.fields;
  var compareToValue = _ref3.compareToValue;

  var rest = _objectWithoutProperties(_ref3, ['compareTo', 'fields', 'compareToValue']);

  compareTo = compareToValue !== undefined ? compareToValue : getField(compareTo, rootNode);
  if (typeof fields[compareTo] === 'undefined' && typeof rest.default === "undefined") throw new Error(compareTo + " has no associated fieldInfo in switch");

  var caseDefault = typeof fields[compareTo] === 'undefined';
  var fieldInfo = getFieldInfo(caseDefault ? rest.default : fields[compareTo]);
  return tryDoc(function () {
    return _this3.sizeOf(value, fieldInfo, rootNode);
  }, caseDefault ? "default" : compareTo);
}

function readOption(buffer, offset, typeArgs, context) {
  if (buffer.length < offset + 1) throw new PartialReadError();
  var val = buffer.readUInt8(offset++);
  if (val !== 0) {
    var retval = this.read(buffer, offset, typeArgs, context);
    retval.size++;
    return retval;
  } else return { size: 1 };
}

function writeOption(value, buffer, offset, typeArgs, context) {
  if (value != null) {
    buffer.writeUInt8(1, offset++);
    offset = this.write(value, buffer, offset, typeArgs, context);
  } else buffer.writeUInt8(0, offset++);
  return offset;
}

function sizeOfOption(value, typeArgs, context) {
  return value == null ? 1 : this.sizeOf(value, typeArgs, context) + 1;
}
//# sourceMappingURL=../maps/datatypes/conditional.js.map
