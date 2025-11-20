import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";

// Constants
const DASHED_LINE_SEGMENT_COUNT = 60;

interface PromoCodeSectionProps {
  promoCode: string;
  minutes: string;
  seconds: string;
}

export default function PromoCodeSection({
  promoCode,
  minutes,
  seconds,
}: PromoCodeSectionProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.promoSection} accessibilityLabel="Promo code section">
      {/* Header Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoIcon} accessibilityLabel="Promo code icon">
          🏷️
        </Text>
        <Text style={styles.promoBannerText}>Your Promo Code is Applied!</Text>
      </View>

      {/* Dashed Separator */}
      <View style={styles.dashedSeparator}>
        <View style={styles.dashedLine}>
          {Array.from({ length: DASHED_LINE_SEGMENT_COUNT }).map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>
        <View style={[styles.dashDot, { left: -10 }]} />
        <View style={[styles.dashDot, { right: -10 }]} />
      </View>

      {/* Promo Code Input and Timer */}
      <View style={styles.promoDetails}>
        {/* Promo Code Input */}
        <View
          style={styles.promoCodeInput}
          accessibilityRole="text"
          accessibilityLabel={`Promo code ${promoCode}`}
        >
          <Text style={styles.checkmark} accessibilityLabel="Applied">
            ✓
          </Text>
          <Text style={styles.promoCodeText}>{promoCode}</Text>
        </View>

        {/* Timer */}
        <View
          style={styles.timerBox}
          accessibilityRole="timer"
          accessibilityLabel={`Time remaining ${minutes} minutes ${seconds} seconds`}
        >
          <Text style={styles.timerText}>
            {minutes} : {seconds}
          </Text>
          <View style={styles.timerLabels}>
            <Text style={styles.timerLabel}>minutes</Text>
            <Text style={styles.timerLabel}>seconds</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    promoSection: {
      backgroundColor: colors.promoSectionBackground,
      borderRadius: 12,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.promoSectionBorder,
      borderStyle: "dashed",
    },
    promoBanner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 8,
      marginVertical: 16,
    },
    promoIcon: {
      fontSize: 20,
      marginRight: 8,
    },
    promoBannerText: {
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Fonts.gothicA1Bold,
      color: colors.text,
    },
    dashedSeparator: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      height: 1,
    },
    dashDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.promoDashDotBackground,
      position: "absolute",
      zIndex: 2,
      top: -10, // Center vertically on the line
    },
    dashedLine: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 1,
      zIndex: 1,
      backgroundColor: colors.promoDashedLineBackground,
    },
    dash: {
      width: 4,
      height: 1,
      backgroundColor: colors.promoDashBackground,
      marginRight: 2,
    },
    promoDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginLeft: 8,
    },
    promoCodeInput: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: colors.promoCodeInputBorder,
    },
    checkmark: {
      fontSize: 16,
      color: colors.success,
      marginRight: 8,
      fontWeight: "bold",
    },
    promoCodeText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.text,
      fontFamily: Fonts.gothicA1Bold,
    },
    timerBox: {
      backgroundColor: colors.timerBoxBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
      minWidth: 100,
      margin: 10,
    },
    timerText: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 18,
      fontWeight: "700",
      color: colors.success,
      marginBottom: 4,
    },
    timerLabels: {
      flexDirection: "row",
      gap: 8,
    },
    timerLabel: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 10,
      color: colors.text,
      fontWeight: "500",
    },
  });
};
