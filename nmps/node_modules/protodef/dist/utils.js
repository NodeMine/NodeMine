"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getField(countField, context) {
  var countFieldArr = countField.split("/");
  var i = 0;
  if (countFieldArr[i] === "") {
    while (context.hasOwnProperty("..")) {
      context = context[".."];
    }i++;
  }
  for (; i < countFieldArr.length; i++) {
    context = context[countFieldArr[i]];
  }return context;
}

function getFieldInfo(fieldInfo) {
  if (typeof fieldInfo === "string") return { type: fieldInfo };else if (Array.isArray(fieldInfo)) return { type: fieldInfo[0], typeArgs: fieldInfo[1] };else if (typeof fieldInfo.type === "string") return fieldInfo;else throw new Error("Not a fieldinfo");
}

function getCount(buffer, offset, _ref, rootNode) {
  var _this = this;

  var count = _ref.count;
  var countType = _ref.countType;
  var countTypeArgs = _ref.countTypeArgs;

  var c = 0;
  var size = 0;
  if (typeof count === "number") c = count;else if (typeof count !== "undefined") {
    c = getField(count, rootNode);
  } else if (typeof countType !== "undefined") {
    var _tryDoc = tryDoc(function () {
      return _this.read(buffer, offset, { type: countType, typeArgs: countTypeArgs }, rootNode);
    }, "$count");

    size = _tryDoc.size;
    c = _tryDoc.value;
  } else // TODO : broken schema, should probably error out.
    c = 0;
  return { count: c, size: size };
}

function sendCount(len, buffer, offset, _ref2, rootNode) {
  var count = _ref2.count;
  var countType = _ref2.countType;
  var countTypeArgs = _ref2.countTypeArgs;

  if (typeof count !== "undefined" && len !== count) {
    // TODO: Throw
  } else if (typeof countType !== "undefined") {
      offset = this.write(len, buffer, offset, { type: countType, typeArgs: countTypeArgs }, rootNode);
    } else {
      // TODO: Throw
    }
  return offset;
}

function calcCount(len, _ref3, rootNode) {
  var _this2 = this;

  var count = _ref3.count;
  var countType = _ref3.countType;
  var countTypeArgs = _ref3.countTypeArgs;

  if (typeof count === "undefined" && typeof countType !== "undefined") return tryDoc(function () {
    return _this2.sizeOf(len, { type: countType, typeArgs: countTypeArgs }, rootNode);
  }, "$count");else return 0;
}

function addErrorField(e, field) {
  e.field = e.field ? field + "." + e.field : field;
  throw e;
}

function tryCatch(tryfn, catchfn) {
  try {
    return tryfn();
  } catch (e) {
    catchfn(e);
  }
}

function tryDoc(tryfn, field) {
  return tryCatch(tryfn, function (e) {
    return addErrorField(e, field);
  });
}

var ExtendableError = function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtendableError).call(this, message));

    _this3.name = _this3.constructor.name;
    _this3.message = message;
    Error.captureStackTrace(_this3, _this3.constructor.name);
    return _this3;
  }

  return ExtendableError;
}(Error);

var PartialReadError = function (_ExtendableError) {
  _inherits(PartialReadError, _ExtendableError);

  function PartialReadError(message) {
    _classCallCheck(this, PartialReadError);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(PartialReadError).call(this, message));

    _this4.partialReadError = true;
    return _this4;
  }

  return PartialReadError;
}(ExtendableError);

module.exports = {
  getField: getField,
  getFieldInfo: getFieldInfo,
  addErrorField: addErrorField,
  getCount: getCount,
  sendCount: sendCount,
  calcCount: calcCount,
  tryCatch: tryCatch,
  tryDoc: tryDoc,
  PartialReadError: PartialReadError
};
//# sourceMappingURL=maps/utils.js.map
