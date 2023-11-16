const testUserAgent = (re: RegExp) =>
    typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.userAgent)
        : false;

const testPlatform = (re: RegExp) =>
    typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.platform)
        : false;

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const isMac = (): boolean => testPlatform(/^Mac/);

export const isIPhone = (): boolean => testPlatform(/^iPhone/);

export const isIPad = (): boolean =>
    testPlatform(/^iPad/) || (isMac() && navigator.maxTouchPoints > 1);

export const isIOS = (): boolean => isIPhone() || isIPad();

export const isAppleDevice = (): boolean => isMac() || isIOS();

export const isChrome = (): boolean => testUserAgent(/Chrome/);

export const isWebKit = (): boolean =>
    testUserAgent(/AppleWebKit/) && !isChrome();

export const isAndroid = (): boolean => testUserAgent(/Android/);
