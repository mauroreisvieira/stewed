const testUserAgent = (re: RegExp) => typeof window !== 'undefined' && window.navigator != null
    ? re.test(window.navigator.userAgent)
    : false;

const testPlatform = (re: RegExp) => typeof window !== 'undefined' && window.navigator != null
    ? re.test(window.navigator.platform)
    : false;

export const isMac = () => testPlatform(/^Mac/);

export const isIPhone = () => testPlatform(/^iPhone/);

export const isIPad = () => testPlatform(/^iPad/) || (isMac() && navigator.maxTouchPoints > 1);

export const isIOS = () => isIPhone() || isIPad();

export const isAppleDevice = () => isMac() || isIOS();

export const isWebKit = () => testUserAgent(/AppleWebKit/) && !isChrome();

export const isChrome = () => testUserAgent(/Chrome/);

export const isAndroid = () => testUserAgent(/Android/);
