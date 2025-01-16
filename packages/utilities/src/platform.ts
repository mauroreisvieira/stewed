/**
 * Tests the given regular expression against the user agent string in the browser window.
 *
 * @param re - The regular expression to test.
 * @returns A boolean indicating whether the regular expression matches the user agent string.
 */
function testUserAgent(re: RegExp): boolean {
  return typeof window !== "undefined" && window.navigator
    ? re.test(window.navigator.userAgent)
    : false;
}

/**
 * Checks if the code is running in a browser environment.
 *
 * @returns A boolean indicating whether the code is running in a browser environment.
 */
export const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * Checks if the current platform is macOS.
 *
 * @returns A boolean indicating whether the current platform is macOS.
 */
export const isMac = (): boolean => testUserAgent(/^Mac/);

/**
 * Checks if the current platform is iPhone.
 *
 * @returns A boolean indicating whether the current platform is iPhone.
 */
export const isIPhone = (): boolean => testUserAgent(/^iPhone/);

/**
 * Checks if the current platform is iPad.
 *
 * @returns A boolean indicating whether the current platform is iPad.
 */
export const isIPad = (): boolean =>
  testUserAgent(/^iPad/) || (isMac() && navigator.maxTouchPoints > 1);

/**
 * Checks if the current platform is iOS.
 *
 * @returns A boolean indicating whether the current platform is iOS.
 */
export const isIOS = (): boolean => isIPhone() || isIPad();

/**
 * Checks if the current platform is an Apple device.
 *
 * @returns A boolean indicating whether the current platform is an Apple device.
 */
export const isAppleDevice = (): boolean => isMac() || isIOS();

/**
 * Checks if the current browser is Chrome.
 *
 * @returns A boolean indicating whether the current browser is Chrome.
 */
export const isChrome = (): boolean => testUserAgent(/Chrome/);

/**
 * Checks if the current browser engine is WebKit.
 *
 * @returns A boolean indicating whether the current browser engine is WebKit.
 */
export const isWebKit = (): boolean => testUserAgent(/AppleWebKit/) && !isChrome();

/**
 * Checks if the current platform is Android.
 *
 * @returns A boolean indicating whether the current platform is Android.
 */
export const isAndroid = (): boolean => testUserAgent(/Android/);

/**
 * Checks if the current platform is touch.
 *
 * @returns A boolean indicating whether the current platform is touch.
 */
export const isTouch = (): boolean =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/**
 * Checks if the code is running in a client-side environment (browser).
 *
 * This function verifies the presence of the `window` object, `document`,
 * and the `createElement` method, which are specific to the browser environment.
 *
 * @returns {boolean} `true` if the code is running on the client-side, otherwise `false`.
 *
 * @example
 * if (isClient()) {
 *   console.log("Running in the browser!");
 * }
 */
export const isClient = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement === "function"
  );
};
