import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

const lockIcon = require("../assets/icons/icon_lock_gray.png");

interface PrivacyStatementProps {
  text?: string;
  marginTop?: number;
  marginBottom?: number;
  style?: ViewStyle;
}

const DEFAULT_TEXT =
  "We respect your privacy and are committed to protecting your personal data. We'll email you a copy of your results for convenient access.";

export default function PrivacyStatement({
  text = DEFAULT_TEXT,
  marginTop = 24,
  marginBottom = 32,
  style,
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
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  marginTop: number,
  marginBottom: number
) => {
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
      marginTop: 2,
      tintColor: colors.icon,
    },
    text: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize: 13,
      color: colors.textPrivacyStatement,
      lineHeight: 18,
      flex: 1,
    },
  });
};
