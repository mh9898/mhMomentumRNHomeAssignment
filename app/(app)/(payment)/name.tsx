import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";
import { Colors } from "../../../constants/theme";
import { useThemeColors } from "../../../hooks/use-theme-colors";
import { usePaymentStore } from "../../../store/paymentStore";
import { isValidName } from "../../../utils/nameValidation";

const NameScreen = () => {
  const { name, setName, logMMKV_Zustand } = usePaymentStore();
  const [localName, setLocalName] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    // Validate name on change
    if (localName.length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    if (isValidName(localName)) {
      setError(null);
      setIsValid(true);
    } else {
      setError("Name must be at least 3 letters");
      setIsValid(false);
    }
  }, [localName]);

  const handleContinue = () => {
    if (isValid && isValidName(localName)) {
      // Store the user's name locally
      // Promo code will be generated automatically by usePromoCode hook
      setName(localName);

      logMMKV_Zustand();

      // Navigate to Product screen
      router.push("./product");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          Enter your name to get your personalized Calisthenics Workout Plan
        </Text>

        {/* Name Input */}
        <AppTextInput
          placeholder="enter your name"
          value={localName}
          onChangeText={setLocalName}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          error={error}
          isValid={isValid}
        />

        {/* Privacy Statement */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            🔒 We respect your privacy and are committed to protecting your
            personal data. We'll email you a copy of your results for convenient
            access.
          </Text>
        </View>

        {/* Continue Button */}
        <AppButton
          title="Continue"
          onPress={handleContinue}
          disabled={!isValid}
          accessibilityLabel="Continue"
        />
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
    privacyContainer: {
      marginTop: 24,
      marginBottom: 32,
    },
    privacyText: {
      fontSize: 12,
      color: colors.icon,
      lineHeight: 18,
    },
  });
};

export default NameScreen;
