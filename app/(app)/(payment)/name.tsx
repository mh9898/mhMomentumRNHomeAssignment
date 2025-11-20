import AppTitle from "@/components/AppTitle";
import PrivacyStatement from "@/components/PrivacyStatement";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";
import { Colors, Fonts } from "../../../constants/theme";
import { useThemeColors } from "../../../hooks/use-theme-colors";
import { usePaymentStore } from "../../../store/paymentStore";
import { isValidName } from "../../../utils/nameValidation";

const arrowIcon = require("../../../assets/icons/icon_arrow_right.png");

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
        <AppTitle lineHeight={34}>
          Enter your name to get your personalized Calisthenics Workout Plan
        </AppTitle>

        {/* Name Input */}
        <AppTextInput
          placeholder="Name"
          value={localName}
          onChangeText={setLocalName}
          autoCapitalize="words"
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

export default NameScreen;
