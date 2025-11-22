import React, { useMemo } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  /**
   * Override the default responsive lineHeight behavior
   * If not provided, will use responsive lineHeight based on screen height
   */
  lineHeight?: number;
  /**
   * Override the default adjustsFontSizeToFit behavior
   * Defaults to true
   */
  adjustsFontSizeToFit?: boolean;
  /**
   * Override the default minimumFontScale
   * Defaults to 0.75
   */
  minimumFontScale?: number;
}

/**
 * AppText component with responsive lineHeight that decreases on smaller screens
 * Automatically applies adjustsFontSizeToFit and minimumFontScale for better text fitting
 * Android-specific adjustments for text size and line height
 */
export default function AppTextLines({
  children,
  style,
  lineHeight,
  adjustsFontSizeToFit = true,
  minimumFontScale = 0.75,
  ...textProps
}: AppTextProps) {
  const screenHeight = Dimensions.get("screen").height;
  const isAndroid = Platform.OS === "android";

  // Calculate responsive lineHeight if not explicitly provided
  const responsiveLineHeight = useMemo(() => {
    if (lineHeight !== undefined) {
      return lineHeight;
    }

    // Android-specific adjustments
    if (isAndroid) {
      // Adjust line height for Android devices
      return screenHeight < 845 ? 34 : 36;
    }

    // iOS logic remains unchanged
    // Default responsive behavior: tighter lineHeight on smaller screens
    return screenHeight < 845 ? 18 : 34;
  }, [lineHeight, screenHeight, isAndroid]);

  // Process style prop to adjust fontSize for Android
  const processedStyle = useMemo(() => {
    if (!isAndroid || !style) {
      return style;
    }

    const styleArray = Array.isArray(style) ? style : [style];
    const adjustedStyles = styleArray.map((s) => {
      if (s && typeof s === "object" && "fontSize" in s && s.fontSize) {
        // Adjust font size for Android (slightly smaller for better fit)
        return {
          ...s,
          fontSize: (s.fontSize as number) * 0.95,
        };
      }
      return s;
    });

    return adjustedStyles.length === 1 ? adjustedStyles[0] : adjustedStyles;
  }, [style, isAndroid]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        lineHeight: responsiveLineHeight,
      },
    });
  }, [responsiveLineHeight]);

  return (
    <Text
      style={[styles.text, processedStyle]}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      {...textProps}
    >
      {children}
    </Text>
  );
}
