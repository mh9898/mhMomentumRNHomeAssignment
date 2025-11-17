import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { usePaymentStore } from "../../../store/paymentStore";
import { isValidEmail } from "../../../utils/emailValidation";

export default function EmailScreen() {
  const { email, setEmail, logMMKV_Zustand } = usePaymentStore();
  const [localEmail, setLocalEmail] = useState(email);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

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

  const handleSaveEmail = () => {
    setEmail(localEmail);
    logMMKV_Zustand();
  };

  const handleDeleteEmail = () => {
    setEmail("");
    setLocalEmail("");
    logMMKV_Zustand();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          Enter your email to get your personalized Calisthenics Workout Plan
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              error && styles.inputError,
              isValid && styles.inputValid,
            ]}
            placeholder="name@domain.com"
            placeholderTextColor={error ? "#FF3B30" : "#999"}
            value={localEmail}
            onChangeText={setLocalEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        {/* Privacy Statement */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            🔒 We respect your privacy and are committed to protecting your
            personal data. We'll email you a copy of your results for convenient
            access.
          </Text>
        </View>

        <TouchableOpacity onPress={handleSaveEmail}>
          <Text>Save Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteEmail}>
          <Text>Delete Email</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid}
          accessibilityLabel="Continue"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text
            style={[styles.buttonText, !isValid && styles.buttonTextDisabled]}
          >
            Continue
          </Text>
          <Text
            style={[styles.buttonArrow, !isValid && styles.buttonTextDisabled]}
          >
            →
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    color: "#000000",
    marginBottom: 32,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  inputError: {
    borderBottomColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  inputValid: {
    borderBottomColor: "#000000",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  privacyContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  privacyText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonDisabled: {
    backgroundColor: "#E5E5E5",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  buttonTextDisabled: {
    color: "#999",
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
});
