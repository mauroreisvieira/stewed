// eslint-disable-next-line check-file/folder-naming-convention
import { describe, it, expect, afterEach } from "vitest";
import {
  testUserAgent,
  isBrowser,
  isMac,
  isIPhone,
  isIPad,
  isIOS,
  isAppleDevice,
  isChrome,
  isTouch,
  isClient
} from "../../index";

// Helper to mock `window.navigator.userAgent`
function mockNavigator(userAgent: string) {
  Object.defineProperty(window, "navigator", {
    value: { userAgent, maxTouchPoints: 1 },
    configurable: true
  });
}

// Simulate a non-browser environment
function restoreWindow() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).window = undefined; // Set `window` to `undefined`
}

// Helper to restore the default navigator
function restoreNavigator() {
  Object.defineProperty(window, "navigator", {
    value: navigator,
    configurable: true
  });
}

describe("Utilities", () => {
  afterEach(() => {
    restoreNavigator();
  });

  describe("testUserAgent", () => {
    it("should return true when the user agent matches the regex", () => {
      mockNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      expect(testUserAgent(/Macintosh/)).toBe(true);
    });

    it("should return false when the user agent does not match the regex", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(testUserAgent(/Macintosh/)).toBe(false);
    });

    it("should return false when window is undefined", () => {
      const originalWindow = global.window;
      // Simulate a non-browser environment
      restoreWindow();
      expect(testUserAgent(/Macintosh/)).toBe(false);
      global.window = originalWindow;
    });
  });

  describe("isBrowser", () => {
    it("should return true in a browser environment", () => {
      expect(isBrowser()).toBe(true);
    });

    it("should return false in a non-browser environment", () => {
      const originalWindow = global.window;
      // Simulate a non-browser environment
      restoreWindow();
      expect(isBrowser()).toBe(false);
      global.window = originalWindow;
    });
  });

  describe("isMac", () => {
    it("should return true for Mac user agents", () => {
      mockNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      expect(isMac()).toBe(true);
    });

    it("should return false for non-Mac user agents", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isMac()).toBe(false);
    });
  });

  describe("isIPhone", () => {
    it("should return true for iPhone user agents", () => {
      mockNavigator("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)");
      expect(isIPhone()).toBe(true);
    });

    it("should return false for non-iPhone user agents", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isIPhone()).toBe(false);
    });
  });

  describe("isIPad", () => {
    it("should return true for iPad user agents", () => {
      mockNavigator("Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)");
      expect(isIPad()).toBe(true);
    });

    it("should return true for Mac with touch support", () => {
      mockNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      Object.defineProperty(navigator, "maxTouchPoints", { value: 2 });
      expect(isIPad()).toBe(true);
    });

    it("should return false for non-iPad user agents", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isIPad()).toBe(false);
    });
  });

  describe("isIOS", () => {
    it("should return true for iPhone user agents", () => {
      mockNavigator("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)");
      expect(isIOS()).toBe(true);
    });

    it("should return true for iPad user agents", () => {
      mockNavigator("Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)");
      expect(isIOS()).toBe(true);
    });

    it("should return false for non-iOS user agents", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isIOS()).toBe(false);
    });
  });

  describe("isAppleDevice", () => {
    it("should return true for macOS user agents", () => {
      mockNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      expect(isAppleDevice()).toBe(true);
    });

    it("should return true for iOS user agents", () => {
      mockNavigator("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)");
      expect(isAppleDevice()).toBe(true);
    });

    it("should return false for non-Apple user agents", () => {
      mockNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isAppleDevice()).toBe(false);
    });
  });

  describe("isChrome", () => {
    it("should return true for Chrome user agents", () => {
      mockNavigator(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );
      expect(isChrome()).toBe(true);
    });

    it("should return false for non-Chrome user agents", () => {
      mockNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      expect(isChrome()).toBe(false);
    });
  });

  describe("isTouch", () => {
    it("should return true when touch events are supported", () => {
      mockNavigator("Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)");
      Object.defineProperty(window, "ontouchstart", { value: true });
      expect(isTouch()).toBe(true);
    });
  });

  describe("isClient", () => {
    it("should return true in a browser environment", () => {
      expect(isClient()).toBe(true);
    });

    it("should return false in a non-browser environment", () => {
      const originalWindow = global.window;
      // Simulate a non-browser environment
      restoreWindow();
      expect(isClient()).toBe(false);
      global.window = originalWindow;
    });
  });
});
