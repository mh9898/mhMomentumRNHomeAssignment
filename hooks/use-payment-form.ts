import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { usePaymentStore } from "../store/paymentStore";
import {
  formatCardNumber,
  formatCVV,
  formatExpiryDate,
} from "../utils/paymentFormatting";

// Constants
const PAYMENT_SUCCESS_RATE = 0.9; // 90% success rate for demo
const API_CALL_DELAY_MS = 1000; // Simulated API call delay
const CARD_NUMBER_LENGTH = 16;
const EXPIRY_DATE_LENGTH = 4;
const CVV_MIN_LENGTH = 3;

interface PaymentFormState {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

interface UsePaymentFormReturn {
  formState: PaymentFormState;
  setCardNumber: (text: string) => void;
  setExpiryDate: (text: string) => void;
  setCvv: (text: string) => void;
  setNameOnCard: (text: string) => void;
  isFormValid: boolean;
  handleBuyNow: () => Promise<void>;
}

/**
 * Hook to manage payment form state, formatting, validation, and submission
 */
export function usePaymentForm(): UsePaymentFormReturn {
  const { clearCheckoutPriceSnapshot } = usePaymentStore();

  const [cardNumber, setCardNumberState] = useState("");
  const [expiryDate, setExpiryDateState] = useState("");
  const [cvv, setCvvState] = useState("");
  const [nameOnCard, setNameOnCardState] = useState("");

  const setCardNumber = useCallback((text: string) => {
    setCardNumberState(formatCardNumber(text));
  }, []);

  const setExpiryDate = useCallback((text: string) => {
    setExpiryDateState(formatExpiryDate(text));
  }, []);

  const setCvv = useCallback((text: string) => {
    setCvvState(formatCVV(text));
  }, []);

  const setNameOnCard = useCallback((text: string) => {
    setNameOnCardState(text);
  }, []);

  // Validation helper function
  const validateForm = useCallback(() => {
    const cardNumberCleaned = cardNumber.replace(/\s/g, "");
    const expiryCleaned = expiryDate.replace(/\//g, "");
    return (
      cardNumberCleaned.length === CARD_NUMBER_LENGTH &&
      expiryCleaned.length === EXPIRY_DATE_LENGTH &&
      cvv.length >= CVV_MIN_LENGTH &&
      nameOnCard.trim().length > 0
    );
  }, [cardNumber, expiryDate, cvv, nameOnCard]);

  const isFormValid = useMemo(() => validateForm(), [validateForm]);

  // Use ref to store the latest handleBuyNow function to avoid stale closure in error handler
  const handleBuyNowRef = useRef<(() => Promise<void>) | undefined>(undefined);

  // Update the ref whenever dependencies change
  useEffect(() => {
    handleBuyNowRef.current = async () => {
      if (!validateForm()) {
        Alert.alert(
          "Invalid Form",
          "Please fill in all payment details correctly."
        );
        return;
      }

      // Mock checkout session
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, API_CALL_DELAY_MS));

        // Mock success - in a real app, this would be an API call
        const success = Math.random() > 1 - PAYMENT_SUCCESS_RATE;

        if (success) {
          // Clear checkout snapshot on successful purchase
          clearCheckoutPriceSnapshot();
          // Navigate to thank you screen
          router.replace("./thank-you");
        } else {
          // Show cancel/error alert
          Alert.alert(
            "Payment Failed",
            "Your payment could not be processed. Please try again.",
            [
              {
                text: "OK",
                onPress: () => {
                  // Stay on checkout screen
                },
              },
            ]
          );
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "An error occurred during checkout. Please try again.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => router.back(),
            },
            {
              text: "Retry",
              onPress: () => {
                // Use ref to get the latest function reference
                handleBuyNowRef.current?.();
              },
            },
          ]
        );
      }
    };
  }, [validateForm, clearCheckoutPriceSnapshot]);

  // Wrap the ref function in a stable callback
  const handleBuyNow = useCallback(async () => {
    await handleBuyNowRef.current?.();
  }, []);

  return {
    formState: {
      cardNumber,
      expiryDate,
      cvv,
      nameOnCard,
    },
    setCardNumber,
    setExpiryDate,
    setCvv,
    setNameOnCard,
    isFormValid,
    handleBuyNow,
  };
}
