/**
 * Tests the given regular expression against the user agent string in the browser window.
 *
 * @param re - The regular expression to test.
 * @returns A boolean indicating whether the regular expression matches the user agent string.
 */
export function testUserAgent(re: RegExp): boolean {
  if (typeof window === "undefined" || !window.navigator) return false;

  return re.test(window.navigator.userAgent);
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
export const isMac = (): boolean => testUserAgent(/Macintosh/);

/**
 * Checks if the current platform is iPhone.
 *
 * @returns A boolean indicating whether the current platform is iPhone.
 */
export const isIPhone = (): boolean => testUserAgent(/iPhone/);

/**
 * Checks if the current platform is iPad.
 *
 * @returns A boolean indicating whether the current platform is iPad.
 */
export const isIPad = (): boolean =>
  testUserAgent(/iPad/) ||
  (isMac() && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1);

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
export const isChrome = (): boolean => testUserAgent(/Chrome/) && !testUserAgent(/Edge|OPR/);

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
 * Checks if the current platform supports touch.
 *
 * @returns A boolean indicating whether the current platform supports touch.
 */
export const isTouch = (): boolean =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0));

/**
 * Checks if the code is running in a client-side environment (browser).
 *
 * @returns A boolean indicating whether the code is running on the client-side.
 */
export const isClient = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof document.createElement === "function"
  );
};
