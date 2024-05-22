/**
 * Inverts the color represented in hexadecimal format.
 * Supports both 3-digit and 6-digit hexadecimal color codes.
 *
 * @param color The color to invert, specified in hexadecimal format.
 * @returns The inverted color in hexadecimal format.
 * @throws {Error} If the input color format is invalid.
 */
export function invertColor(color: string): string {
  const hex: string = color.startsWith("#") ? color.substring(1) : color;
  let invertedHex: string;

  if (hex.length === 3) {
    invertedHex = hex
      .split("")
      .map((c) => {
        return (15 - parseInt(c, 16)).toString(16);
      })
      .join("");
  } else if (hex.length === 6) {
    invertedHex = (0xffffff ^ parseInt(hex, 16)).toString(16).padStart(6, "0");
  } else {
    throw new Error("Invalid color format");
  }

  return "#" + invertedHex;
}
