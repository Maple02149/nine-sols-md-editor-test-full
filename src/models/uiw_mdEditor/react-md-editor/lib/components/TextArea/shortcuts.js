"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = shortcutsHandle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
function getCommands() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var resulte = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  data.forEach(function (item) {
    if (item.children && Array.isArray(item.children)) {
      resulte = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, resulte), getCommands(item.children || []));
    } else if (item.keyCommand && item.shortcuts && item.execute) {
      resulte[item.shortcuts.toLocaleLowerCase()] = item;
    }
  });
  return resulte;
}
function shortcutsHandle(e) {
  var commands = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var commandOrchestrator = arguments.length > 2 ? arguments[2] : undefined;
  var dispatch = arguments.length > 3 ? arguments[3] : undefined;
  var state = arguments.length > 4 ? arguments[4] : undefined;
  var data = getCommands(commands || []);
  var shortcuts = [];
  if (e.altKey) {
    shortcuts.push('alt');
  }
  if (e.shiftKey) {
    shortcuts.push('shift');
  }
  if (e.metaKey) {
    shortcuts.push('cmd');
  }
  if (e.ctrlKey) {
    shortcuts.push('ctrl');
  }
  if (shortcuts.length > 0 && !/(control|alt|meta|shift)/.test(e.key.toLocaleLowerCase())) {
    shortcuts.push(e.key.toLocaleLowerCase());
  }
  if (/escape/.test(e.key.toLocaleLowerCase())) {
    shortcuts.push('escape');
  }
  if (shortcuts.length < 1) {
    return;
  }
  var equal = !!data[shortcuts.join('+')];
  var command = equal ? data[shortcuts.join('+')] : undefined;
  Object.keys(data).forEach(function (item) {
    var isequal = item.split('+').every(function (v) {
      if (/ctrlcmd/.test(v)) {
        return shortcuts.includes('ctrl') || shortcuts.includes('cmd');
      }
      return shortcuts.includes(v);
    });
    if (isequal) {
      command = data[item];
    }
  });
  if (command && commandOrchestrator) {
    e.stopPropagation();
    e.preventDefault();
    commandOrchestrator.executeCommand(command, dispatch, state, shortcuts);
    return;
  }
}
module.exports = exports.default;