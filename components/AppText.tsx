import { responsiveFontSize } from "@/utils/responsiveText";
import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
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

export default function AppText({
  children,
  style,
  adjustsFontSizeToFit = true,
  minimumFontScale = 0.75,
  ...textProps
}: AppTextProps) {
  const isAndroid = Platform.OS === "android";

  // Process style to apply responsive font sizing
  const processedStyle = useMemo(() => {
    if (!style) return {};

    const styleArray = Array.isArray(style) ? style : [style];
    const mergedStyle = Object.assign({}, ...styleArray);

    const processed: TextStyle = { ...mergedStyle };

    // Apply responsive font size if fontSize is provided
    if (mergedStyle.fontSize) {
      if (isAndroid) {
        // Android-specific: apply responsive font size and then reduce by 5% for better fit
        processed.fontSize = responsiveFontSize(mergedStyle.fontSize) * 2;
      } else {
        // iOS logic remains unchanged
        processed.fontSize = responsiveFontSize(mergedStyle.fontSize);
      }
    }

    return processed;
  }, [style, isAndroid]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {},
    });
  }, []);

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
