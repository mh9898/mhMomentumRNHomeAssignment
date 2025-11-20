import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AppButton from "@/components/AppButton";
import AppTextInput from "@/components/AppTextInput";
import AppTitle from "@/components/AppTitle";
import PrivacyStatement from "@/components/PrivacyStatement";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { usePaymentStore } from "@/store/paymentStore";
import { isValidEmail } from "@/utils/emailValidation";

const arrowIcon = require("@/assets/icons/icon_arrow_right.png");

const EmailScreen = () => {
  const { email, setEmail, logMMKV_Zustand } = usePaymentStore();
  const [localEmail, setLocalEmail] = useState(email);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    // Validate email on change
    if (localEmail.length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    if (isValidEmail(localEmail)) {
      setError(null);
      setIsValid(true);
    } else {
      setError("Please enter a valid email");
      setIsValid(false);
    }
  }, [localEmail]);

  const handleContinue = () => {
    if (isValid && isValidEmail(localEmail)) {
      setEmail(localEmail);
      logMMKV_Zustand();
      router.push("./name");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Title */}
        <AppTitle lineHeight={34}>
          Enter your email to get your personalized Calisthenics Workout Plan
        </AppTitle>

        {/* Email Input */}
        <AppTextInput
          placeholder="name@domain.com"
          value={localEmail}
          onChangeText={setLocalEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          error={error}
          isValid={isValid}
          fontSize={26}
          fontFamily={Fonts.gothicA1SemiBold}
        />

        {/* Privacy Statement */}
        <PrivacyStatement />

        {/* Continue Button */}
        <AppButton
          title="Continue"
          onPress={handleContinue}
          disabled={!isValid}
          accessibilityLabel="Continue"
          icon={arrowIcon}
          iconColor={colors.buttonText}
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
  });
};

export default EmailScreen;
