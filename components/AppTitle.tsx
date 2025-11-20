import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface ScreenTitleProps extends Omit<TextProps, "style"> {
  children: React.ReactNode;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: "left" | "center" | "right";
  marginBottom?: number;
  margin?: number;
  style?: TextStyle;
}

export default function AppTitle({
  children,
  fontSize = 26,
  lineHeight,
  textAlign = "left",
  marginBottom = 32,
  margin,
  style,
  ...textProps
}: ScreenTitleProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, fontSize, lineHeight, textAlign, marginBottom, margin),
    [colors, fontSize, lineHeight, textAlign, marginBottom, margin]
  );

  return (
    <Text style={[styles.title, style]} {...textProps}>
      {children}
    </Text>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  fontSize: number,
  lineHeight: number | undefined,
  textAlign: "left" | "center" | "right",
  marginBottom: number,
  margin: number | undefined
) => {
  return StyleSheet.create({
    title: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize,
      fontWeight: "600",
      color: colors.text,
      textAlign,
      lineHeight: lineHeight || fontSize * 1.3,
      ...(margin !== undefined ? { margin } : { marginBottom }),
    },
  });
};

