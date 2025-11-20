import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Colors, Fonts } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme-colors";

interface AppTextInputProps extends TextInputProps {
  error?: string | null;
  isValid?: boolean;
  fontSize?: number;
  fontFamily?: string;
}

export default function AppTextInput({
  error,
  isValid,
  fontSize = 16,
  fontFamily,
  style,
  ...textInputProps
}: AppTextInputProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, error, isValid, fontSize, fontFamily),
    [colors, error, isValid, fontSize, fontFamily]
  );

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={error ? colors.error : colors.icon}
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  error?: string | null,
  isValid?: boolean,
  fontSize: number = 16,
  fontFamily?: string
) => {
  return StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: error
        ? colors.error
        : isValid
        ? colors.text
        : colors.border,
      paddingVertical: 12,
      fontSize,
      fontFamily,
      color: colors.text,
      backgroundColor: error ? colors.errorBackground : colors.background,
      textAlign: "center",
    },
    errorText: {
      fontFamily: Fonts.gothicA1SemiBold,
      color: colors.error,
      fontSize: 14,
      marginTop: 8,
      textAlign: "center",
    },
  });
};
