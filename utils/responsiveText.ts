import { Dimensions, PixelRatio } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height;

// Define a base width for your design (e.g., iPhone 6/7/8 width)
const baseWidth = 375;

const scale = screenWidth / baseWidth;

/**
 * Normalizes a font size based on screen width to ensure consistent scaling across different devices
 * @param size - The base font size to normalize
 * @returns The normalized font size rounded to the nearest pixel
 */
export function normalize(size: number): number {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Calculates a responsive line height that decreases on smaller screens to fit more text
 * @param fontSize - The font size to calculate line height for
 * @param baseMultiplier - Base multiplier for line height (default: 1.3)
 * @param minMultiplier - Minimum multiplier for very small screens (default: 1.1)
 * @returns The calculated line height rounded to the nearest pixel
 */
export function responsiveLineHeight(
  fontSize: number,
  baseMultiplier: number = 1.3,
  minMultiplier: number = 1.1
): number {
  // On smaller screens (scale < 1), use a tighter line height
  // On larger screens (scale >= 1), use the base multiplier
  // Interpolate between minMultiplier and baseMultiplier based on screen size
  const multiplier =
    scale < 1
      ? baseMultiplier - (baseMultiplier - minMultiplier) * (1 - scale)
      : baseMultiplier;

  const lineHeight = fontSize * multiplier;
  return Math.round(PixelRatio.roundToNearestPixel(lineHeight));
}

/**
 * Checks if the current screen is considered a small screen (height < 845px)
 * @returns true if the screen height is less than 845px, false otherwise
 */
export function isSmallScreen(): boolean {
  return screenHeight < 845;
}

/**
 * Returns a responsive font size that decreases by 0.6x on screens smaller than 845px height
 * @param baseSize - The base font size to scale
 * @returns The responsive font size rounded to the nearest pixel
 */
export function responsiveFontSize(baseSize: number): number {
  const isSmallScreen = screenHeight < 845;
  const fontSize = isSmallScreen ? baseSize * 0.6 : baseSize;
  return Math.round(PixelRatio.roundToNearestPixel(fontSize));
}

/**
 * Normalizes font size based on screen width AND adjusts for small screen height
 * This combines width-based normalization with height-based scaling
 * @param size - The base font size to normalize
 * @param smallScreenSize - Optional font size to use on small screens (height < 845px). If not provided, uses the base size.
 * @returns The normalized and adjusted font size rounded to the nearest pixel
 */
export function normalizeResponsive(
  size: number,
  smallScreenSize?: number
): number {
  const adjustedSize =
    isSmallScreen() && smallScreenSize !== undefined ? smallScreenSize : size;
  return normalize(adjustedSize);
}

/**
 * Normalizes font size based on screen width AND automatically adjusts for small screen height
 * On small screens (height < 845px), automatically reduces font size by 0.6x before normalizing
 * @param size - The base font size to normalize
 * @returns The normalized and adjusted font size rounded to the nearest pixel
 */
export function normalizeFont(size: number): number {
  const adjustedSize = isSmallScreen() ? size * 0.6 : size;
  return normalize(adjustedSize);
}
