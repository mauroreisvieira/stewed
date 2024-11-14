/**
 * @jest-environment jsdom
 */

import {
  isBrowser,
  isMac,
  isIPhone,
  isIPad,
  isIOS,
  isAppleDevice,
  isChrome,
  isWebKit,
  isAndroid,
} from "../index";

describe("Platform and Browser Detection", () => {
  beforeEach(() => {
    // Mock window and navigator properties using Object.defineProperty

    // Mocking the window object to simulate a browser environment
    Object.defineProperty(globalThis, "window", {
      value: {
        navigator: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          platform: "MacIntel",
          maxTouchPoints: 5,
          ontouchstart: null,
        },
      },
      writable: true,
    });
  });

  it("should detect if running in a browser environment", () => {
    expect(isBrowser()).toBe(true);
  });

  it("should detect macOS", () => {
    expect(isMac()).toBe(true);
  });

  it("should detect iPhone", () => {
    Object.defineProperty(window.navigator, "platform", { value: "iPhone" });
    expect(isIPhone()).toBe(true);
  });

  it("should detect iPad", () => {
    Object.defineProperty(window.navigator, "platform", { value: "iPad" });
    expect(isIPad()).toBe(true);
  });

  it("should detect iOS based on iPhone or iPad", () => {
    Object.defineProperty(window.navigator, "platform", { value: "iPhone" });
    expect(isIOS()).toBe(true);

    Object.defineProperty(window.navigator, "platform", { value: "iPad" });
    expect(isIOS()).toBe(true);
  });

  it("should detect Apple devices (Mac or iOS)", () => {
    Object.defineProperty(window.navigator, "platform", { value: "MacIntel" });
    expect(isAppleDevice()).toBe(true);

    Object.defineProperty(window.navigator, "platform", { value: "iPhone" });
    expect(isAppleDevice()).toBe(true);

    Object.defineProperty(window.navigator, "platform", { value: "Windows" });
    expect(isAppleDevice()).toBe(false);
  });

  it("should detect Chrome browser", () => {
    expect(isChrome()).toBe(true);
  });

  it("should detect WebKit engine", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Version/13.0.4 Safari/537.36",
    });
    expect(isWebKit()).toBe(true);
  });

  it("should detect Android", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36",
    });
    expect(isAndroid()).toBe(true);
  });

  it("should return false for non-browser environments", () => {
    // Simulating a non-browser environment (e.g., server-side)
    Object.defineProperty(globalThis, "window", { value: undefined });
    expect(isBrowser()).toBe(false);
  });
});
