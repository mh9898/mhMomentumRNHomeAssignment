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
  isExpiryDateInvalid: boolean;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const previousExpiryDateRef = useRef("");

  const setCardNumber = useCallback((text: string) => {
    setCardNumberState(formatCardNumber(text));
  }, []);

  const setExpiryDate = useCallback((text: string) => {
    const previousExpiry = previousExpiryDateRef.current;
    const previousCleaned = previousExpiry.replace(/\//g, "");
    const newCleaned = text.replace(/\//g, "");

    // Detect if user is deleting the slash: previous had "/" but new text doesn't,
    // and the digits are the same (user deleted just the slash)
    const wasDeletingSlash =
      previousExpiry.includes("/") &&
      !text.includes("/") &&
      previousCleaned === newCleaned &&
      newCleaned.length === 2;

    // If user deleted the slash from "MM/" format, allow it to stay as "MM"
    if (wasDeletingSlash) {
      setExpiryDateState(newCleaned);
      previousExpiryDateRef.current = newCleaned;
      return;
    }

    const formatted = formatExpiryDate(text);
    setExpiryDateState(formatted);
    previousExpiryDateRef.current = formatted;
  }, []);

  const setCvv = useCallback((text: string) => {
    setCvvState(formatCVV(text));
  }, []);

  const setNameOnCard = useCallback((text: string) => {
    setNameOnCardState(text);
  }, []);

  // Validation helper function to check if expiry date is not expired
  const isExpiryDateValid = useCallback((expiry: string): boolean => {
    const expiryCleaned = expiry.replace(/\//g, "");
    if (expiryCleaned.length !== EXPIRY_DATE_LENGTH) {
      return false;
    }

    const month = parseInt(expiryCleaned.substring(0, 2), 10);
    const year = parseInt(expiryCleaned.substring(2, 4), 10);

    // Validate month is between 01-12
    if (month < 1 || month > 12) {
      return false;
    }

    // Convert YY to full year (e.g., 25 -> 2025)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
    const fullYear = 2000 + year;

    // Card expires at the end of the expiry month, so it's valid until the last day of that month
    // Compare: if fullYear > currentYear, it's valid
    // If fullYear === currentYear, check if month >= currentMonth
    if (fullYear > currentYear) {
      return true;
    } else if (fullYear === currentYear) {
      return month >= currentMonth;
    } else {
      return false; // Year is in the past
    }
  }, []);

  // Validation helper function
  const validateForm = useCallback(() => {
    const cardNumberCleaned = cardNumber.replace(/\s/g, "");
    const expiryCleaned = expiryDate.replace(/\//g, "");
    return (
      cardNumberCleaned.length === CARD_NUMBER_LENGTH &&
      expiryCleaned.length === EXPIRY_DATE_LENGTH &&
      isExpiryDateValid(expiryDate) &&
      cvv.length >= CVV_MIN_LENGTH &&
      nameOnCard.trim().length > 0
    );
  }, [cardNumber, expiryDate, cvv, nameOnCard, isExpiryDateValid]);

  const isFormValid = useMemo(() => validateForm(), [validateForm]);

  // Check if expiry date is invalid (has been entered but is invalid or expired)
  const isExpiryDateInvalid = useMemo(() => {
    const expiryCleaned = expiryDate.replace(/\//g, "");
    // Only show as invalid if user has entered something (at least 4 digits) but it's invalid
    if (expiryCleaned.length === EXPIRY_DATE_LENGTH) {
      return !isExpiryDateValid(expiryDate);
    }
    return false;
  }, [expiryDate, isExpiryDateValid]);

  // Use ref to store the latest handleBuyNow function to avoid stale closure in error handler
  const handleBuyNowRef = useRef<(() => Promise<void>) | undefined>(undefined);

  // Update the ref whenever dependencies change
  useEffect(() => {
    handleBuyNowRef.current = async () => {
      if (!validateForm()) {
        const expiryCleaned = expiryDate.replace(/\//g, "");
        let errorMessage = "Please fill in all payment details correctly.";

        // Provide specific error message for expired cards
        if (
          expiryCleaned.length === EXPIRY_DATE_LENGTH &&
          !isExpiryDateValid(expiryDate)
        ) {
          errorMessage =
            "The card expiry date is invalid or has expired. Please check and try again.";
        }

        Alert.alert("Invalid Form", errorMessage);
        return;
      }

      // Set loading state
      setIsLoading(true);

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
          setIsLoading(false);
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
        setIsLoading(false);
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
  }, [validateForm, clearCheckoutPriceSnapshot, expiryDate, isExpiryDateValid]);

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
    isExpiryDateInvalid,
    isLoading,
    handleBuyNow,
  };
}
