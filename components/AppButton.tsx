import { Colors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AppButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  disabled?: boolean;
  showArrow?: boolean;
  style?: TouchableOpacityProps["style"];
}

export default function AppButton({
  title,
  disabled = false,
  showArrow = true,
  style,
  accessibilityLabel,
  ...touchableOpacityProps
}: AppButtonProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, disabled),
    [colors, disabled]
  );
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled }}
      {...touchableOpacityProps}
    >
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
        {title}
      </Text>
      {showArrow && (
        <Text
          style={[styles.buttonArrow, disabled && styles.buttonTextDisabled]}
        >
          →
        </Text>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (colors: typeof Colors.light, disabled: boolean) => {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 50,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "auto",
    },
    buttonDisabled: {
      backgroundColor: colors.border,
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "600",
      marginRight: 8,
    },
    buttonTextDisabled: {
      color: colors.icon,
    },
    buttonArrow: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "600",
    },
  });
};
