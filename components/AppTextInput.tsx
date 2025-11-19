import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Colors } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme-colors";

interface AppTextInputProps extends TextInputProps {
  error?: string | null;
  isValid?: boolean;
}

export default function AppTextInput({
  error,
  isValid,
  style,
  ...textInputProps
}: AppTextInputProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, error, isValid),
    [colors, error, isValid]
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
  isValid?: boolean
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
      fontSize: 16,
      color: colors.text,
      backgroundColor: error ? colors.errorBackground : colors.background,
      textAlign: "center",
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 8,
      textAlign: "center",
    },
  });
};
