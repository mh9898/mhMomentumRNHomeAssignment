/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    error: "#FF3B30",
    border: "#E5E5E5",
    errorBackground: "#FFF5F5",
    buttonBackground: "#000000",
    buttonText: "#FFFFFF",
    success: "#4CAF50",
    planCardBorder: "#2196F3",
    radioButtonBackground: "#EFF1F5",
    popularBannerBackground: "#568EF7",
    popularBannerText: "#FFFFFF",
    promoSectionBackground: "#B5D9CD",
    promoSectionBorder: "#C8E6C9",
    promoDashDotBackground: "#FFFFFF",
    promoDashedLineBackground: "#75A898",
    promoDashBackground: "#A5D6A7",
    promoCodeInputBorder: "#75A898",
    timerBoxBackground: "#CEEAE2",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    error: "#b22f39",
    border: "#3A3A3A",
    errorBackground: "#2A1515",
    buttonBackground: "#FFFFFF",
    buttonText: "#000000",
    success: "#66BB6A",
    planCardBorder: "#42A5F5",
    radioButtonBackground: "#2A2D35",
    popularBannerBackground: "#5C9DF7",
    popularBannerText: "#FFFFFF",
    promoSectionBackground: "#2D4A42",
    promoSectionBorder: "#3A5A4F",
    promoDashDotBackground: "#151718",
    promoDashedLineBackground: "#4A7A6A",
    promoDashBackground: "#3A6A5A",
    promoCodeInputBorder: "#4A7A6A",
    timerBoxBackground: "#2A4A3A",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
    /** Custom Gothic A1 font */
    gothicA1: "GothicA1-Regular",
    gothicA1Medium: "GothicA1-Medium",
    gothicA1SemiBold: "GothicA1-SemiBold",
    gothicA1Bold: "GothicA1-Bold",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
    /** Custom Gothic A1 font */
    gothicA1: "GothicA1-Regular",
    gothicA1Medium: "GothicA1-Medium",
    gothicA1SemiBold: "GothicA1-SemiBold",
    gothicA1Bold: "GothicA1-Bold",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    /** Custom Gothic A1 font - fallback to sans-serif on web */
    gothicA1: "'Gothic A1', sans-serif",
    gothicA1Medium: "'Gothic A1', sans-serif",
    gothicA1SemiBold: "'Gothic A1', sans-serif",
    gothicA1Bold: "'Gothic A1', sans-serif",
  },
});
