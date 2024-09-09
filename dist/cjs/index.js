'use strict';

var React = require('react');
var client = require('react-dom/client');

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return stringify(rnds);
}

var style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
};
var MapToolTip = new Map();
var ToolTip = /** @class */ (function () {
    function ToolTip(props) {
        var _a, _b, _c, _d, _e;
        this.isShow = false;
        this.position = 'left';
        this.props = props;
        this.id = v4();
        MapToolTip.set(this.id, this);
        this.Close = this.Close.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mode = (_b = (_a = this.props.options) === null || _a === void 0 ? void 0 : _a.mode) !== null && _b !== void 0 ? _b : "tooltip";
        this.div = document.createElement("div");
        this.div.className = "bsr-left-tooltip";
        if ((_c = this.props.options) === null || _c === void 0 ? void 0 : _c.className) {
            this.div.className = this.props.options.className;
        }
        if ((_d = this.props.options) === null || _d === void 0 ? void 0 : _d.style) {
            Object.assign(this.div.style, this.props.options.style);
        }
        this.innerRoot = client.createRoot(this.div);
        if (React.isValidElement(this.props.body)) {
            this.innerRoot.render(this.props.body);
        }
        else {
            this.innerRoot.render(React.createElement("div", { style: style }, this.props.body));
        }
        this.isWindows = false;
        if (this.mode === 'tooltip') {
            this.ActivateTooltip();
        }
        else {
            this.ActivateWindows();
            this.isWindows = true;
            this.div.style.cursor = "pointer";
        }
        this.position = 'right';
        if ((_e = this.props.options) === null || _e === void 0 ? void 0 : _e.position) {
            this.position = this.props.options.position;
        }
    }
    ToolTip.prototype.Close = function () {
        if (this.isShow) {
            document.body.removeChild(this.div);
            this.isShow = false;
        }
    };
    ToolTip.prototype.ActivateWindows = function () {
        var _a, _b;
        if (this.mode === 'popup' || this.mode === 'popupCloseSelf') {
            (_a = this.props.target) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseup', this.mouseEnter);
        }
        else {
            (_b = this.props.target) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseenter', this.mouseEnter);
        }
        if (this.mode === 'popupCloseSelf') ;
        else {
            this.div.addEventListener("click", this.Close);
        }
    };
    ToolTip.prototype.maxZIndex = function () {
        return Array.from(document.querySelectorAll('body *'))
            .map(function (a) { return parseFloat(window.getComputedStyle(a).zIndex); })
            .filter(function (a) { return !isNaN(a); })
            .sort()
            .pop();
    };
    ToolTip.prototype.ActivateTooltip = function () {
        var _a, _b;
        (_a = this.props.target) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', this.mouseEnter);
        (_b = this.props.target) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseleave', this.Close);
    };
    ToolTip.prototype.getOffsetPosition = function (el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    };
    ToolTip.prototype.getOffsetAttribute = function (el) {
        var rect = el.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    };
    ToolTip.prototype.mouseEnter = function () {
        if (this.props.target !== undefined) {
            MapToolTip.forEach(function (value) {
                value.Close();
            });
            if (!this.isShow) {
                var element = this.props.target;
                var position = this.getOffsetPosition(element);
                var attributes = this.getOffsetAttribute(element);
                var zIndex = this.maxZIndex();
                if (zIndex) {
                    this.div.style.zIndex = "".concat(zIndex + 1);
                }
                else {
                    this.div.style.zIndex = "10000000000000";
                }
                document.body.appendChild(this.div);
                if (this.position === 'custom') {
                    this.isShow = true;
                }
                if (this.position === 'right') {
                    var h = position.top + Math.round(attributes.height / 2) - Math.round(this.div.offsetHeight / 2);
                    var w = attributes.width + position.left;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'rightBottom') {
                    var h = position.top + attributes.height;
                    var w = attributes.width + position.left;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'rightTop') {
                    var h = position.top - this.div.offsetHeight;
                    var w = attributes.width + position.left;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'left') {
                    var h = position.top + Math.round(attributes.height / 2) - Math.round(this.div.offsetHeight / 2);
                    var w = position.left - this.div.offsetWidth - 10;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'leftBottom') {
                    var h = position.top + attributes.height;
                    var w = position.left - this.div.offsetWidth - 10;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'leftTop') {
                    var h = position.top - this.div.offsetHeight;
                    var w = position.left - this.div.offsetWidth - 10;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'bottom') {
                    var h = position.top + attributes.height;
                    var w = position.left + attributes.width / 2 - this.div.offsetWidth / 2;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'bottomRight') {
                    var h = position.top + attributes.height;
                    var w = position.left + attributes.width;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'bottomLeft') {
                    var h = position.top + attributes.height;
                    var w = position.left - this.div.offsetWidth;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'top') {
                    var h = position.top - this.div.offsetHeight - 10;
                    var w = position.left + attributes.width / 2 - this.div.offsetWidth / 2;
                    if (this.isWindows) {
                        w = position.left + attributes.width / 2;
                    }
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'topRight') {
                    var h = position.top - this.div.offsetHeight - 10;
                    var w = position.left + attributes.width;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'topLeft') {
                    var h = position.top - this.div.offsetHeight - 10;
                    var w = position.left - this.div.offsetWidth;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
            }
        }
    };
    ToolTip.prototype.ContextMenuWillUnmount = function () {
        var _this = this;
        this.props.body = undefined;
        this.props.target = undefined;
        MapToolTip.delete(this.id);
        setTimeout(function () {
            _this.innerRoot.unmount();
            if (_this.isShow) {
                try {
                    document.body.removeChild(_this.div);
                }
                catch (e) {
                }
            }
            _this.props.target = undefined;
        });
    };
    return ToolTip;
}());

var useToolTip = function (target, body, options) {
    var res = {
        tooltip: undefined,
        target: target,
        options: options
    };
    //let toolTip:ToolTip|undefined
    React.useEffect(function () {
        if (target === null || target === void 0 ? void 0 : target.current) {
            res.tooltip = new ToolTip({ target: target.current, body: body, options: options });
        }
        return function () {
            var _a;
            (_a = res.tooltip) === null || _a === void 0 ? void 0 : _a.ContextMenuWillUnmount();
        };
    }, [target === null || target === void 0 ? void 0 : target.current]);
    return res;
};

exports.ToolTip = ToolTip;
exports.useToolTip = useToolTip;
