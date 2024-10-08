"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarItems = ToolbarItems;
exports.ToolbarVisibility = ToolbarVisibility;
exports["default"] = Toolbar;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _react = _interopRequireWildcard(require("react"));
var _Context = require("../../Context");
var _Child = _interopRequireDefault(require("./Child"));
var _jsxRuntime = require("react/jsx-runtime");
function ToolbarItems(props) {
  var prefixCls = props.prefixCls,
    overflow = props.overflow;
  var _useContext = (0, _react.useContext)(_Context.EditorContext),
    fullscreen = _useContext.fullscreen,
    preview = _useContext.preview,
    _useContext$barPopup = _useContext.barPopup,
    barPopup = _useContext$barPopup === void 0 ? {} : _useContext$barPopup,
    components = _useContext.components,
    commandOrchestrator = _useContext.commandOrchestrator,
    dispatch = _useContext.dispatch;
  var originalOverflow = (0, _react.useRef)('');
  function handleClick(command, name) {
    if (!dispatch) return;
    var state = {
      barPopup: (0, _objectSpread2["default"])({}, barPopup)
    };
    if (command.keyCommand === 'preview') {
      state.preview = command.value;
    }
    if (command.keyCommand === 'fullscreen') {
      state.fullscreen = !fullscreen;
    }
    if (props.commands && command.keyCommand === 'group') {
      props.commands.forEach(function (item) {
        if (name === item.groupName) {
          state.barPopup[name] = true;
        } else if (item.keyCommand) {
          state.barPopup[item.groupName] = false;
        }
      });
    } else if (name || command.parent) {
      Object.keys(state.barPopup || {}).forEach(function (keyName) {
        state.barPopup[keyName] = false;
      });
    }
    if (Object.keys(state).length) {
      dispatch((0, _objectSpread2["default"])({}, state));
    }
    commandOrchestrator && commandOrchestrator.executeCommand(command);
  }
  (0, _react.useEffect)(function () {
    if (document && overflow) {
      if (fullscreen) {
        // prevent scroll on fullscreen
        document.body.style.overflow = 'hidden';
      } else {
        // get the original overflow only the first time
        if (!originalOverflow.current) {
          originalOverflow.current = window.getComputedStyle(document.body, null).overflow;
        }
        // reset to the original overflow
        document.body.style.overflow = originalOverflow.current;
      }
    }
  }, [fullscreen, originalOverflow, overflow]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    children: (props.commands || []).map(function (item, idx) {
      if (item.keyCommand === 'divider') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, item.liProps), {}, {
          className: "".concat(prefixCls, "-toolbar-divider")
        }), idx);
      }
      if (!item.keyCommand) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {}, idx);
      var activeBtn = fullscreen && item.keyCommand === 'fullscreen' || item.keyCommand === 'preview' && preview === item.value;
      var childNode = item.children && typeof item.children === 'function' ? item.children({
        getState: function getState() {
          return commandOrchestrator.getState();
        },
        textApi: commandOrchestrator ? commandOrchestrator.textApi : undefined,
        close: function close() {
          return handleClick({}, item.groupName);
        },
        execute: function execute() {
          return handleClick({
            execute: item.execute
          });
        },
        dispatch: dispatch
      }) : undefined;
      var disabled = barPopup && preview && preview === 'preview' && !/(preview|fullscreen)/.test(item.keyCommand);
      var render = (components === null || components === void 0 ? void 0 : components.toolbar) || item.render;
      var com = render && typeof render === 'function' ? render(item, !!disabled, handleClick, idx) : null;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, item.liProps), {}, {
        className: activeBtn ? "active" : '',
        children: [com && /*#__PURE__*/_react["default"].isValidElement(com) && com, !com && !item.buttonProps && item.icon, !com && item.buttonProps && /*#__PURE__*/_react["default"].createElement('button', (0, _objectSpread2["default"])((0, _objectSpread2["default"])({
          type: 'button',
          key: idx,
          disabled: disabled,
          'data-name': item.name
        }, item.buttonProps), {}, {
          onClick: function onClick(evn) {
            evn.stopPropagation();
            handleClick(item, item.groupName);
          }
        }), item.icon), item.children && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Child["default"], {
          overflow: overflow,
          groupName: item.groupName,
          prefixCls: prefixCls,
          children: childNode,
          commands: Array.isArray(item.children) ? item.children : undefined
        })]
      }), idx);
    })
  });
}
function Toolbar() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefixCls = props.prefixCls,
    isChild = props.isChild,
    className = props.className;
  var _useContext2 = (0, _react.useContext)(_Context.EditorContext),
    commands = _useContext2.commands,
    extraCommands = _useContext2.extraCommands;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "".concat(prefixCls, "-toolbar ").concat(className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarItems, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, props), {}, {
      commands: props.commands || commands || []
    })), !isChild && /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarItems, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, props), {}, {
      commands: extraCommands || []
    }))]
  });
}
function ToolbarVisibility(props) {
  var hideToolbar = props.hideToolbar,
    toolbarBottom = props.toolbarBottom,
    placement = props.placement,
    overflow = props.overflow,
    prefixCls = props.prefixCls;
  if (hideToolbar || placement === 'bottom' && !toolbarBottom || placement === 'top' && toolbarBottom) {
    return null;
  }
  var cls = toolbarBottom ? 'bottom' : '';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Toolbar, {
    prefixCls: prefixCls,
    overflow: overflow,
    className: cls
  });
}