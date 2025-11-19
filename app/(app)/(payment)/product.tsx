import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/theme";
import { useThemeColors } from "../../../hooks/use-theme-colors";
import { usePaymentStore } from "../../../store/paymentStore";

const ProductScreen = () => {
  const { name, promoCode, isDiscountActive } = usePaymentStore();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Product</Text>

        {/* User Info */}
        {name && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{name}</Text>
          </View>
        )}

        {/* Discount Code */}
        {promoCode && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Discount Code:</Text>
            <Text style={styles.discountCode}>{promoCode}</Text>
            {isDiscountActive && <Text style={styles.activeLabel}>Active</Text>}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 32,
      textAlign: "left",
    },
    infoContainer: {
      marginBottom: 24,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.icon,
      marginBottom: 8,
    },
    infoValue: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "500",
    },
    discountCode: {
      fontSize: 20,
      color: colors.text,
      fontWeight: "600",
      fontFamily: "monospace",
    },
    activeLabel: {
      fontSize: 12,
      color: colors.success,
      marginTop: 4,
    },
  });
};

export default ProductScreen;
