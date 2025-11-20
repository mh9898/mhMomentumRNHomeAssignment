import { useMemo } from "react";
import { usePaymentStore } from "@/store/paymentStore";

const ORIGINAL_PRICE = 50.0;
const DISCOUNTED_PRICE = 25.0;
const DAYS_IN_PLAN = 28; // 4 weeks

/**
 * Hook to calculate product pricing based on discount state
 * @returns Object containing pricing information
 */
export function useProductPricing() {
  const { isDiscountActive } = usePaymentStore();

  const pricing = useMemo(() => {
    const dailyPrice = isDiscountActive
      ? (DISCOUNTED_PRICE / DAYS_IN_PLAN).toFixed(2)
      : (ORIGINAL_PRICE / DAYS_IN_PLAN).toFixed(2);
    const displayPrice = isDiscountActive ? DISCOUNTED_PRICE : ORIGINAL_PRICE;

    return {
      originalPrice: ORIGINAL_PRICE,
      discountedPrice: DISCOUNTED_PRICE,
      displayPrice,
      dailyPrice,
      isDiscountActive,
    };
  }, [isDiscountActive]);

  return pricing;
}

