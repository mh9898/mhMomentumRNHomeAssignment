import { responsiveFontSize } from "@/utils/responsiveText";
import React, { useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

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
  // Process style to apply responsive font sizing
  const processedStyle = useMemo(() => {
    if (!style) return {};

    const styleArray = Array.isArray(style) ? style : [style];
    const mergedStyle = Object.assign({}, ...styleArray);

    const processed: TextStyle = { ...mergedStyle };

    // Apply responsive font size if fontSize is provided
    if (mergedStyle.fontSize) {
      processed.fontSize = responsiveFontSize(mergedStyle.fontSize);
    }

    return processed;
  }, [style]);

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
