"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isWebKit = exports.isChrome = exports.isAppleDevice = exports.isIOS = exports.isIPad = exports.isIPhone = exports.isMac = exports.isBrowser = void 0;
var testUserAgent = function (re) {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.userAgent)
        : false;
};
var testPlatform = function (re) {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.platform)
        : false;
};
var isBrowser = function () { return typeof window !== 'undefined'; };
exports.isBrowser = isBrowser;
var isMac = function () { return testPlatform(/^Mac/); };
exports.isMac = isMac;
var isIPhone = function () { return testPlatform(/^iPhone/); };
exports.isIPhone = isIPhone;
var isIPad = function () {
    return testPlatform(/^iPad/) || ((0, exports.isMac)() && navigator.maxTouchPoints > 1);
};
exports.isIPad = isIPad;
var isIOS = function () { return (0, exports.isIPhone)() || (0, exports.isIPad)(); };
exports.isIOS = isIOS;
var isAppleDevice = function () { return (0, exports.isMac)() || (0, exports.isIOS)(); };
exports.isAppleDevice = isAppleDevice;
var isChrome = function () { return testUserAgent(/Chrome/); };
exports.isChrome = isChrome;
var isWebKit = function () {
    return testUserAgent(/AppleWebKit/) && !(0, exports.isChrome)();
};
exports.isWebKit = isWebKit;
var isAndroid = function () { return testUserAgent(/Android/); };
exports.isAndroid = isAndroid;
