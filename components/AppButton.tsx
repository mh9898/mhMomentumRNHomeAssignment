import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AppButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  disabled?: boolean;
  showArrow?: boolean;
  icon?: ImageSourcePropType;
  iconColor?: string;
  style?: TouchableOpacityProps["style"];
}

export default function AppButton({
  title,
  disabled = false,
  showArrow = true,
  icon,
  iconColor,
  style,
  accessibilityLabel,
  ...touchableOpacityProps
}: AppButtonProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, disabled),
    [colors, disabled]
  );

  const iconTintColor =
    iconColor || (disabled ? colors.icon : colors.buttonText);

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
      {icon ? (
        <Image
          source={icon}
          style={[styles.buttonIcon, { tintColor: iconTintColor }]}
          resizeMode="contain"
        />
      ) : showArrow ? (
        <Text
          style={[styles.buttonArrow, disabled && styles.buttonTextDisabled]}
        >
          →
        </Text>
      ) : null}
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
      marginBottom: 30,
    },
    buttonDisabled: {
      backgroundColor: colors.buttonDisabledColor,
    },
    buttonText: {
      fontFamily: Fonts.gothicA1Medium,
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "500",
      marginRight: 8,
    },
    buttonTextDisabled: {
      color: colors.buttonText,
    },
    buttonArrow: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "600",
    },
    buttonIcon: {
      width: 20,
      height: 20,
      marginLeft: 4,
    },
  });
};
