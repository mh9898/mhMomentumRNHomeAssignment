import React, { useMemo } from "react";
import {
  Dimensions,
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

  // Calculate responsive lineHeight if not explicitly provided
  const responsiveLineHeight = useMemo(() => {
    if (lineHeight !== undefined) {
      return lineHeight;
    }
    // Default responsive behavior: tighter lineHeight on smaller screens
    return screenHeight < 845 ? 18 : 34;
  }, [lineHeight, screenHeight]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        lineHeight: responsiveLineHeight,
      },
    });
  }, [responsiveLineHeight]);

  return (
    <Text
      style={[styles.text, style]}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      {...textProps}
    >
      {children}
    </Text>
  );
}
