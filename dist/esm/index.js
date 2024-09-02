import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

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
        var _a, _b, _c, _d, _e, _f, _g;
        this.isShow = false;
        this.position = 'left';
        this.props = props;
        this.id = v4();
        MapToolTip.set(this.id, this);
        this.Close = this.Close.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.div = document.createElement("div");
        this.div.className = "bsr-left-tooltip";
        if ((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.className) {
            this.div.className = this.props.options.className;
        }
        if ((_b = this.props.options) === null || _b === void 0 ? void 0 : _b.style) {
            Object.assign(this.div.style, this.props.options.style);
        }
        this.innerRoot = createRoot(this.div);
        if (React.isValidElement(this.props.body)) {
            this.innerRoot.render(this.props.body);
        }
        else {
            this.innerRoot.render(React.createElement("div", { style: style }, this.props.body));
        }
        this.isWindows = false;
        if (((_c = this.props.options) === null || _c === void 0 ? void 0 : _c.isWindowsClick) === true || ((_d = this.props.options) === null || _d === void 0 ? void 0 : _d.isWindows) === true) {
            this.ActivateWindows();
            this.isWindows = true;
            this.div.style.cursor = "pointer";
        }
        else {
            this.ActivateTooltip();
        }
        this.position = 'left';
        if ((_e = this.props.options) === null || _e === void 0 ? void 0 : _e.position) {
            this.position = this.props.options.position;
        }
        this.marginVertical = 0;
        if ((_f = this.props.options) === null || _f === void 0 ? void 0 : _f.marginVertical) {
            this.marginVertical = this.props.options.marginVertical;
        }
        this.marginHorizontal = 0;
        if ((_g = this.props.options) === null || _g === void 0 ? void 0 : _g.marginHorizontal) {
            this.marginHorizontal = this.props.options.marginHorizontal;
        }
    }
    ToolTip.prototype.Close = function () {
        if (this.isShow) {
            document.body.removeChild(this.div);
            this.isShow = false;
        }
    };
    ToolTip.prototype.ActivateWindows = function () {
        var _a, _b, _c;
        if ((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.isWindowsClick) {
            (_b = this.props.target) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseup', this.mouseEnter);
        }
        else {
            (_c = this.props.target) === null || _c === void 0 ? void 0 : _c.addEventListener('mouseenter', this.mouseEnter);
        }
        this.div.addEventListener("click", this.Close);
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
    ToolTip.prototype.getOffsetAttrubute = function (el) {
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
                var attributes = this.getOffsetAttrubute(element);
                document.body.appendChild(this.div);
                if (this.position === 'left') {
                    var h = position.top + attributes.height / 2 - this.div.offsetHeight / 2 + this.marginVertical;
                    if (this.isWindows) {
                        h = position.top + attributes.height / 2;
                    }
                    var w = attributes.width + position.left + this.marginHorizontal;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'right') {
                    var h = position.top + attributes.height / 2 - this.div.offsetHeight / 2 + this.marginVertical;
                    if (this.isWindows) {
                        h = position.top + attributes.height / 2;
                    }
                    var w = position.left - this.div.offsetWidth - 10 + this.marginHorizontal;
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'bottom') {
                    var h = position.top + attributes.height + this.marginVertical;
                    var w = position.left + attributes.width / 2 - this.div.offsetWidth / 2 + this.marginHorizontal;
                    if (this.isWindows) {
                        w = position.left + attributes.width / 2;
                    }
                    this.div.style.top = h + "px";
                    this.div.style.left = w + "px";
                    this.isShow = true;
                }
                if (this.position === 'top') {
                    var h = position.top - this.div.offsetHeight - 5 + this.marginVertical - 5;
                    var w = position.left + attributes.width / 2 - this.div.offsetWidth / 2 + this.marginHorizontal;
                    if (this.isWindows) {
                        w = position.left + attributes.width / 2;
                    }
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
    useEffect(function () {
        var toolTip;
        if (target === null || target === void 0 ? void 0 : target.current) {
            toolTip = new ToolTip({ target: target.current, body: body, options: options });
        }
        return function () {
            toolTip === null || toolTip === void 0 ? void 0 : toolTip.ContextMenuWillUnmount();
        };
    }, [target === null || target === void 0 ? void 0 : target.current]);
};

export { ToolTip, useToolTip };
