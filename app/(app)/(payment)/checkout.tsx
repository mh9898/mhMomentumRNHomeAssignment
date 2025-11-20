import BuyNowButton from "@/components/BuyNowButton";
import OrderSummary from "@/components/OrderSummary";
import PaymentForm from "@/components/PaymentForm";
import PaymentMethods from "@/components/PaymentMethods";
import { Colors } from "@/constants/theme";
import { usePaymentForm } from "@/hooks/use-payment-form";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { usePromoCode } from "@/hooks/use-promo-code";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { usePaymentStore } from "@/store/paymentStore";
import React, { useEffect, useMemo, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const CheckoutScreen = () => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { promoCode } = usePromoCode();
  const { originalPrice } = useProductPricing();
  const { checkoutPriceSnapshot, checkoutDiscountActive } = usePaymentStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    formState,
    setCardNumber,
    setExpiryDate,
    setCvv,
    setNameOnCard,
    isFormValid,
    isExpiryDateInvalid,
    isLoading,
    handleBuyNow,
  } = usePaymentForm();

  // Use locked price snapshot if available, otherwise fallback to live pricing
  const lockedPrice =
    checkoutPriceSnapshot !== null ? checkoutPriceSnapshot : originalPrice;
  const lockedDiscountActive =
    checkoutDiscountActive !== null ? checkoutDiscountActive : false;

  const discountAmount = lockedDiscountActive ? originalPrice - lockedPrice : 0;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleInputFocus = () => {
    // Clear any existing timeout before setting a new one
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Scroll to show the input when focused
    scrollTimeoutRef.current = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      scrollTimeoutRef.current = null;
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.content}>
          {/* Main White Card containing Order Summary and Payment Form */}
          <View style={styles.orderCard}>
            <OrderSummary
              originalPrice={originalPrice}
              lockedPrice={lockedPrice}
              lockedDiscountActive={lockedDiscountActive}
              discountAmount={discountAmount}
              promoCode={promoCode}
            />

            <PaymentMethods />

            <PaymentForm
              cardNumber={formState.cardNumber}
              expiryDate={formState.expiryDate}
              cvv={formState.cvv}
              nameOnCard={formState.nameOnCard}
              onCardNumberChange={setCardNumber}
              onExpiryDateChange={setExpiryDate}
              onCVVChange={setCvv}
              onNameOnCardChange={setNameOnCard}
              onInputFocus={handleInputFocus}
              isExpiryDateInvalid={isExpiryDateInvalid}
            />

            <View style={styles.buttonContainer}>
              <BuyNowButton
                onPress={handleBuyNow}
                disabled={!isFormValid}
                loading={isLoading}
              />
            </View>
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
      backgroundColor: colors.screenBackground,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 100, // Extra padding for keyboard
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 40,
    },
    orderCard: {
      backgroundColor: colors.background, // White card
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 20,
    },
    buttonContainer: {
      marginTop: "auto",
    },
  });
};

export default CheckoutScreen;
