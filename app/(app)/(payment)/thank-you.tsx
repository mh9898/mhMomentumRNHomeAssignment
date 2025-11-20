import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ThankYouScreen = () => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleContinue = () => {
    // Navigate back to product screen or home
    router.replace("./product");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Thank You</Text>
          {/* CTA Button for debugging */}
          {/* <View style={styles.buttonContainer}>
            <AppButton
              title="Continue"
              onPress={handleContinue}
              accessibilityLabel="Continue"
            />
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize: 26,
      fontWeight: "600",
      color: colors.success,
      marginBottom: 16,
      textAlign: "center",
    },
    buttonContainer: {
      width: "100%",
      marginTop: 20,
    },
  });
};

export default ThankYouScreen;
