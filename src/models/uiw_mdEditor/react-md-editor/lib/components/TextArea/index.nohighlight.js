"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TextArea;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _Context = require("../../Context");
var _shortcuts = _interopRequireDefault(require("./shortcuts"));
var _Textarea = _interopRequireDefault(require("./Textarea"));
var _commands = require("../../commands");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["prefixCls", "className", "onScroll", "renderTextarea"];
function TextArea(props) {
  var _ref = props || {},
    prefixCls = _ref.prefixCls,
    className = _ref.className,
    onScroll = _ref.onScroll,
    renderTextarea = _ref.renderTextarea,
    otherProps = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_Context.EditorContext),
    markdown = _useContext.markdown,
    scrollTop = _useContext.scrollTop,
    commands = _useContext.commands,
    extraCommands = _useContext.extraCommands,
    dispatch = _useContext.dispatch;
  var textRef = _react["default"].useRef(null);
  var executeRef = _react["default"].useRef();
  var warp = /*#__PURE__*/_react["default"].createRef();
  (0, _react.useEffect)(function () {
    var state = {};
    if (warp.current) {
      state.textareaWarp = warp.current || undefined;
      warp.current.scrollTop = scrollTop || 0;
    }
    if (dispatch) {
      dispatch((0, _objectSpread2["default"])({}, state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(function () {
    if (textRef.current && dispatch) {
      var _commandOrchestrator = new _commands.TextAreaCommandOrchestrator(textRef.current);
      executeRef.current = _commandOrchestrator;
      dispatch({
        textarea: textRef.current,
        commandOrchestrator: _commandOrchestrator
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var textStyle = {
    WebkitTextFillColor: 'initial',
    overflow: 'auto'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: warp,
    className: "".concat(prefixCls, "-area ").concat(className || ''),
    onScroll: onScroll,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(prefixCls, "-text"),
      children: renderTextarea ? ( /*#__PURE__*/_react["default"].cloneElement(renderTextarea((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, otherProps), {}, {
        value: markdown,
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'false',
        autoCapitalize: 'off',
        className: "".concat(prefixCls, "-text-input"),
        style: {
          WebkitTextFillColor: 'inherit',
          overflow: 'auto'
        }
      }), {
        dispatch: dispatch,
        onChange: otherProps.onChange,
        shortcuts: _shortcuts["default"],
        useContext: {
          commands: commands,
          extraCommands: extraCommands,
          commandOrchestrator: executeRef.current
        }
      }), {
        ref: textRef
      })) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Textarea["default"], (0, _objectSpread2["default"])((0, _objectSpread2["default"])({
          prefixCls: prefixCls
        }, otherProps), {}, {
          style: textStyle
        }))
      })
    })
  });
}
module.exports = exports.default;