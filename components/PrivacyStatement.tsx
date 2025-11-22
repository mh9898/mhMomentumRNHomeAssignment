import AppTextLines from "@/components/AppTextLines";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { isSmallScreen, normalizeFont } from "@/utils/responsiveText";
import React, { useMemo } from "react";
import { Image, Platform, StyleSheet, View, ViewStyle } from "react-native";

const lockIcon = require("@/assets/icons/icon_lock_gray.png");

interface PrivacyStatementProps {
  text?: string;
  marginTop?: number;
  marginBottom?: number;
  style?: ViewStyle;
  numberOfLines?: number;
}

const DEFAULT_TEXT =
  "We respect your privacy and are committed to protecting your personal data. We'll email you a copy of your results for convenient access.";

export default function PrivacyStatement({
  text = DEFAULT_TEXT,
  marginTop = 20,
  marginBottom = 32,
  style,
  numberOfLines,
}: PrivacyStatementProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, marginTop, marginBottom),
    [colors, marginTop, marginBottom]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Image source={lockIcon} style={styles.lockIcon} resizeMode="contain" />
        <AppTextLines style={styles.text} numberOfLines={numberOfLines}>
          {text}
        </AppTextLines>
      </View>
    </View>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  marginTop: number,
  marginBottom: number
) => {
  const isAndroid = Platform.OS === "android";

  // Android-specific fontSize and lineHeight adjustments
  const baseFontSize = 13;
  const baseLineHeight = 18;

  const fontSize = isAndroid ? baseFontSize * 2 : baseFontSize;
  const lineHeight = isAndroid
    ? normalizeFont(baseLineHeight) * 2
    : normalizeFont(baseLineHeight);

  return StyleSheet.create({
    container: {
      marginTop,
      marginBottom,
    },
    content: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    lockIcon: {
      width: 14,
      height: 14,
      marginRight: 6,
      marginTop: isAndroid ? 0 : isSmallScreen() ? 5 : 0,
      tintColor: colors.icon,
    },
    text: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize,
      color: colors.textPrivacyStatement,
      lineHeight,
      flex: 1,
    },
  });
};
