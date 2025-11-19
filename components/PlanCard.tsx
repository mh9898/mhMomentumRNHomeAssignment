import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme-colors";

interface PlanCardProps {
  displayPrice: number;
  dailyPrice: string;
  originalPrice: number;
  isDiscountActive: boolean;
}

export default function PlanCard({
  displayPrice,
  dailyPrice,
  originalPrice,
  isDiscountActive,
}: PlanCardProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      style={styles.planCard}
      accessibilityRole="radio"
      accessibilityState={{ selected: true }}
      accessibilityLabel="4 Week Plan"
    >
      <View
        style={styles.radioButton}
        accessibilityRole="radio"
        accessibilityState={{ selected: true }}
      >
        <View style={styles.radioButtonInner} />
      </View>
      <View style={styles.planHeader}>
        <View style={styles.planLeft}>
          <View style={styles.planInfo}>
            <Text style={styles.planTitle}>4 WEEK PLAN</Text>
            <View style={styles.priceContainer}>
              {isDiscountActive && (
                <Text
                  style={styles.originalPrice}
                  accessibilityLabel={`Original price ${originalPrice.toFixed(2)} USD`}
                >
                  {originalPrice.toFixed(2)} USD
                </Text>
              )}
              <Text
                style={styles.currentPrice}
                accessibilityLabel={`Current price ${displayPrice.toFixed(2)} USD`}
              >
                {displayPrice.toFixed(2)} USD
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.planRight}>
          <View style={styles.dailyPriceContainer}>
            <Text
              style={styles.dailyPriceNumber}
              accessibilityLabel={`Daily price ${dailyPrice}`}
            >
              {dailyPrice}
            </Text>
            <Text style={styles.dailyPriceCurrency}>USD</Text>
          </View>
          <Text style={styles.dailyLabel}>per day</Text>
        </View>
      </View>

      <View style={styles.popularBanner}>
        <Text style={styles.popularText}>MOST POPULAR</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    planCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 0,
      borderWidth: 1,
      borderColor: colors.planCardBorder,
      marginBottom: 24,
      position: "relative",
      overflow: "hidden",
    },
    planHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      paddingLeft: 44, // Make room for radio button
    },
    planLeft: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
    },
    radioButton: {
      position: "absolute",
      left: 16,
      top: "30%",
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.radioButtonBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    radioButtonInner: {
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: colors.text,
    },
    planInfo: {
      flex: 1,
    },
    planTitle: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    originalPrice: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 14,
      fontWeight: "500",
      color: colors.error,
      textDecorationLine: "line-through",
    },
    currentPrice: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 14,
      fontWeight: "500",
      color: colors.icon, // Lighter grey for discounted price
    },
    planRight: {
      alignItems: "flex-end",
    },
    dailyPriceContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    dailyPriceNumber: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      lineHeight: 28,
    },
    dailyPriceCurrency: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize: 10,
      fontWeight: "700",
      color: colors.text,
      marginLeft: 2,
      marginTop: 2,
      textTransform: "uppercase",
    },
    dailyLabel: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 14,
      fontWeight: "500",
      color: colors.icon,
      marginTop: 0,
      alignSelf: "flex-start",
    },
    popularBanner: {
      backgroundColor: colors.popularBannerBackground,
      paddingVertical: 8,
      paddingHorizontal: 12,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    popularText: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.popularBannerText,
      letterSpacing: 0.5,
    },
  });
};
