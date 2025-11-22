import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";

const couponIcon = require("@/assets/icons/icon_coupon.png");
const fireIcon = require("@/assets/icons/icon_fire.png");

interface OrderSummaryProps {
  originalPrice: number;
  lockedPrice: number;
  lockedDiscountActive: boolean;
  discountAmount: number;
  promoCode: string | null;
}

export default function OrderSummary({
  originalPrice,
  lockedPrice,
  lockedDiscountActive,
  discountAmount,
  promoCode,
}: OrderSummaryProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      {/* Plan Details */}
      <View style={styles.orderRow}>
        <AppText style={styles.orderLabel}>4 Week Plan</AppText>
        <AppText style={styles.orderValue}>${originalPrice.toFixed(2)}</AppText>
      </View>

      {/* Discount */}
      {lockedDiscountActive && (
        <View style={styles.orderRow}>
          <AppText style={styles.discountLabel}>
            Your 50% intro discount
          </AppText>
          <AppText style={styles.discountValue}>
            -${discountAmount.toFixed(2)}
          </AppText>
        </View>
      )}

      {/* Promo Code Bar */}
      {promoCode && lockedDiscountActive && (
        <View style={styles.promoCodeBar}>
          <Image
            source={couponIcon}
            style={styles.promoCodeIcon}
            resizeMode="contain"
          />
          <AppText style={styles.promoCodeText}>
            Applied promo code:{" "}
            <AppText style={styles.promoCodeBold}>{promoCode}</AppText>
          </AppText>
        </View>
      )}

      {/* Total */}
      <View style={styles.totalRow}>
        <AppText style={styles.totalLabel}>Total today:</AppText>
        <AppText style={styles.totalValue}>${lockedPrice.toFixed(2)}</AppText>
      </View>

      {/* Savings Message */}
      {lockedDiscountActive && (
        <View style={styles.savingsRow}>
          <Image
            source={fireIcon}
            style={styles.savingsIcon}
            resizeMode="contain"
          />
          <AppText style={styles.savingsText}>
            You just saved ${discountAmount.toFixed(2)} (50% OFF)
          </AppText>
        </View>
      )}
    </>
  );
}

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    orderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    orderLabel: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    orderValue: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
    discountLabel: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 14,
      color: colors.text,
    },
    discountValue: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 14,
      color: colors.error,
    },
    promoCodeBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: 16,
    },
    promoCodeIcon: {
      width: 16,
      height: 16,
      marginRight: 8,
    },
    promoCodeText: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 14,
      color: colors.textSecondary,
    },
    promoCodeBold: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 14,
      color: colors.text,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    totalLabel: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 16,
      fontWeight: "800",
      color: colors.text,
    },
    totalValue: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 16,
      fontWeight: "800",
      color: colors.text,
    },
    savingsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: 12,
      marginBottom: 12,
    },
    savingsIcon: {
      width: 16,
      height: 16,
      marginRight: 6,
    },
    savingsText: {
      fontFamily: Fonts.gothicA1Bold,
      fontSize: 14,
      color: colors.error,
    },
  });
};
