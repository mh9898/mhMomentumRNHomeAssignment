import { useEffect, useState } from "react";
import { generateDiscountCode } from "../utils/discountCode";
import { usePaymentStore } from "../store/paymentStore";

const PROMO_CODE_VALIDITY_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to manage promo code generation and timer
 * @returns Object containing promo code state and formatted time
 */
export function usePromoCode() {
  const {
    name,
    promoCode,
    promoCodeCreatedAt,
    isDiscountActive,
    setPromoCode,
    checkPromoCodeValidity,
  } = usePaymentStore();

  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Generate promo code on mount if not exists
  useEffect(() => {
    if (name && !promoCode) {
      const code = generateDiscountCode(name);
      const createdAt = Date.now();
      setPromoCode(code, createdAt);
    }
  }, [name, promoCode, setPromoCode]);

  // Update timer and check validity
  useEffect(() => {
    if (!promoCodeCreatedAt) {
      setTimeRemaining(0);
      return;
    }

    // Check validity on mount to ensure state is correct
    checkPromoCodeValidity();

    let previousRemaining = PROMO_CODE_VALIDITY_DURATION_MS;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - promoCodeCreatedAt;
      const remaining = Math.max(0, PROMO_CODE_VALIDITY_DURATION_MS - elapsed);
      setTimeRemaining(remaining);

      // Only check validity when timer expires (crosses from >0 to 0)
      // This reduces unnecessary store updates
      if (remaining === 0 && previousRemaining > 0) {
        checkPromoCodeValidity();
      }
      previousRemaining = remaining;
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [promoCodeCreatedAt, checkPromoCodeValidity]);

  const formatTime = (ms: number): { minutes: string; seconds: string } => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTime(timeRemaining);

  return {
    promoCode,
    isDiscountActive,
    timeRemaining,
    minutes,
    seconds,
  };
}

