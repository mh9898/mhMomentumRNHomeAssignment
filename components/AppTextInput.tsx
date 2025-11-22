import AppText from "@/components/AppText";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { normalizeFont } from "@/utils/responsiveText";
import React, { useMemo } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
  error?: string | null;
  isValid?: boolean;
  fontSize?: number;
  fontFamily?: string;
  containerStyle?: ViewStyle;
}

export default function AppTextInput({
  error,
  isValid,
  fontSize = 16,
  fontFamily,
  style,
  containerStyle,
  ...textInputProps
}: AppTextInputProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () => createStyles(colors, error, isValid, fontSize, fontFamily),
    [colors, error, isValid, fontSize, fontFamily]
  );

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={error ? colors.error : colors.icon}
        {...textInputProps}
      />
      {error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  error?: string | null,
  isValid?: boolean,
  fontSize: number = 26,
  fontFamily?: string
) => {
  const responsiveInputFontSize = normalizeFont(fontSize);
  const responsiveErrorFontSize = normalizeFont(18);

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
      fontSize: responsiveInputFontSize,
      fontFamily,
      color: colors.text,
      backgroundColor: error ? colors.errorBackground : colors.background,
      textAlign: "center",
    },
    errorText: {
      fontFamily: Fonts.gothicA1SemiBold,
      color: colors.error,
      fontSize: responsiveErrorFontSize,
      marginTop: 8,
      textAlign: "center",
    },
  });
};
