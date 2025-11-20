import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme-colors";

const lockIcon = require("../assets/icons/icon_lock.png");

interface BuyNowButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function BuyNowButton({
  onPress,
  disabled = false,
}: BuyNowButtonProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      style={[styles.buyNowButton, disabled && styles.buyNowButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel="Buy Now"
      accessibilityState={{ disabled }}
    >
      <Image source={lockIcon} style={styles.lockIcon} resizeMode="contain" />
      <Text style={[styles.buyNowText, disabled && styles.buyNowTextDisabled]}>
        Buy Now
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    buyNowButton: {
      backgroundColor: colors.success,
      borderRadius: 50,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buyNowButtonDisabled: {
      backgroundColor: colors.border,
    },
    lockIcon: {
      width: 18,
      height: 18,
      marginRight: 8,
    },
    buyNowText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Fonts.gothicA1SemiBold,
    },
    buyNowTextDisabled: {
      color: colors.icon,
    },
  });
};
