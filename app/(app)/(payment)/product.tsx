import AppButton from "@/components/AppButton";
import PlanCard from "@/components/PlanCard";
import PromoCodeSection from "@/components/PromoCodeSection";
import { Colors, Fonts } from "@/constants/theme";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { usePromoCode } from "@/hooks/use-promo-code";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { usePaymentStore } from "@/store/paymentStore";
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

const ProductScreen = () => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { promoCode, isDiscountActive, minutes, seconds } = usePromoCode();
  const { displayPrice, dailyPrice, originalPrice } = useProductPricing();
  const { setCheckoutPriceSnapshot } = usePaymentStore();

  const handleGetMyPlan = () => {
    // Lock the price when navigating to checkout
    setCheckoutPriceSnapshot(displayPrice, isDiscountActive);
    router.push("./checkout");
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
          <Text style={styles.title}>Choose the best plan for you</Text>

          {/* Promo Code Section */}
          {promoCode && isDiscountActive && (
            <PromoCodeSection
              promoCode={promoCode}
              minutes={minutes}
              seconds={seconds}
            />
          )}

          {/* Plan Card */}
          <PlanCard
            displayPrice={displayPrice}
            dailyPrice={dailyPrice}
            originalPrice={originalPrice}
            isDiscountActive={isDiscountActive}
          />
          {/* CTA Button */}
          <View style={styles.buttonContainer}>
            <AppButton
              title="Get My Plan"
              accessibilityLabel="Get My Plan"
              onPress={handleGetMyPlan}
            />
          </View>
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
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 40,
    },
    title: {
      fontFamily: Fonts.gothicA1SemiBold,
      fontSize: Platform.OS === "android" ? 21 : 22,
      fontWeight: "600",
      color: colors.text,
      margin: 16,
      textAlign: "center",
    },
    buttonContainer: {
      paddingTop: 20,
      backgroundColor: colors.background,
    },
  });
};

export default ProductScreen;
