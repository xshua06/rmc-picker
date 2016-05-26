'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.contains = contains;
exports.noop = noop;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addEventListener(target, eventType, cb) {
  /* eslint camelcase: 2 */
  var callback = _reactDom2["default"].unstable_batchedUpdates ? function run(e) {
    _reactDom2["default"].unstable_batchedUpdates(cb, e);
  } : cb;
  target.addEventListener(eventType, callback, false);
  return {
    remove: function remove() {
      target.removeEventListener(eventType, callback, false);
    }
  };
}

function contains(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

function noop() {}