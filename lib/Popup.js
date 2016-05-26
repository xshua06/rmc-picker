'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopupPicker = _react2["default"].createClass({
  displayName: 'PopupPicker',

  propTypes: {
    visible: _react.PropTypes.bool,
    onOk: _react.PropTypes.func,
    onVisibleChange: _react.PropTypes.func,
    children: _react.PropTypes.element,
    content: _react.PropTypes.any,
    onDismiss: _react.PropTypes.func,
    popupTransitionName: _react.PropTypes.string,
    maskTransitionName: _react.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rmc-picker-popup',
      onVisibleChange: _utils.noop,
      okText: 'Ok',
      dismissText: 'Dismiss',
      title: '',
      style: {},
      onOk: _utils.noop,
      onDismiss: _utils.noop
    };
  },
  getInitialState: function getInitialState() {
    return {
      visible: this.props.visible || false
    };
  },
  componentDidMount: function componentDidMount() {
    this.popupContainer = document.createElement('div');
    document.body.appendChild(this.popupContainer);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setVisibleState(nextProps.visible);
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.visible) {
      if (!this.onDocumentClickListener) {
        this.onDocumentClickListener = (0, _utils.addEventListener)(document, 'click', this.onDocumentClick);
      }
      _reactDom2["default"].render(this.getModal(), this.popupContainer);
    } else {
      if (this.onDocumentClickListener) {
        this.onDocumentClickListener.remove();
        this.onDocumentClickListener = null;
      }
      _reactDom2["default"].unmountComponentAtNode(this.popupContainer);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    _reactDom2["default"].unmountComponentAtNode(this.popupContainer);
    document.body.removeChild(this.popupContainer);
  },
  onOk: function onOk() {
    this.fireVisibleChange(false);
    this.props.onOk();
  },
  onDismiss: function onDismiss() {
    this.fireVisibleChange(false);
    this.props.onDismiss();
  },
  onTriggerClick: function onTriggerClick(e) {
    this.fireVisibleChange(!this.state.visible);
    var child = _react2["default"].Children.only(this.props.children);
    var childProps = child.props || {};
    if (childProps.onClick) {
      childProps.onClick(e);
    }
  },
  onDocumentClick: function onDocumentClick(e) {
    if (e.target !== this.modalContent && !(0, _utils.contains)(this.modalContent, e.target)) {
      this.fireVisibleChange(false);
    }
  },
  setVisibleState: function setVisibleState(visible) {
    this.setState({
      visible: visible
    });
  },
  getModal: function getModal() {
    var props = this.props;
    return _react2["default"].createElement(
      _rcDialog2["default"],
      {
        prefixCls: '' + props.prefixCls,
        visible: true,
        transitionName: props.popupTransitionName,
        maskTransitionName: props.maskTransitionName,
        closable: false,
        style: props.style
      },
      _react2["default"].createElement(
        'div',
        { ref: this.saveModalContent },
        _react2["default"].createElement(
          'div',
          { className: props.prefixCls + '-header' },
          _react2["default"].createElement(
            'div',
            { className: props.prefixCls + '-item', onClick: this.onDismiss },
            props.dismissText
          ),
          _react2["default"].createElement(
            'div',
            { className: props.prefixCls + '-item ' + props.prefixCls + '-title' },
            props.title
          ),
          _react2["default"].createElement(
            'div',
            { className: props.prefixCls + '-item', onClick: this.onOk },
            props.okText
          )
        ),
        this.props.content
      )
    );
  },
  saveModalContent: function saveModalContent(content) {
    this.modalContent = content;
  },
  fireVisibleChange: function fireVisibleChange(visible) {
    if (this.state.visible !== visible) {
      if (!('visible' in this.props)) {
        this.setVisibleState(visible);
      }
      this.props.onVisibleChange(visible);
    }
  },
  render: function render() {
    var props = this.props;
    var children = props.children;
    if (!children) {
      return null;
    }
    var child = _react2["default"].Children.only(children);
    var newChildProps = {
      onClick: this.onTriggerClick
    };
    return _react2["default"].cloneElement(child, newChildProps);
  }
});

exports["default"] = PopupPicker;
module.exports = exports['default'];