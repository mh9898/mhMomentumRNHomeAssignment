import AppText from "@/components/AppText";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const lockIcon = require("@/assets/icons/icon_lock.png");

interface BuyNowButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function BuyNowButton({
  onPress,
  disabled = false,
  loading = false,
}: BuyNowButtonProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.buyNowButton,
        ...(isDisabled ? [styles.buyNowButtonDisabled] : []),
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel="Buy Now"
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={colors.buttonText} size="small" />
      ) : (
        <Image source={lockIcon} style={styles.lockIcon} resizeMode="contain" />
      )}
      <AppText
        style={[
          styles.buyNowText,
          ...(isDisabled ? [styles.buyNowTextDisabled] : []),
        ]}
      >
        {loading ? "Processing..." : "Buy Now"}
      </AppText>
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
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Fonts.gothicA1SemiBold,
      textAlign: "justify",
    },
    buyNowTextDisabled: {
      color: colors.icon,
    },
  });
};
