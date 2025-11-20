import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "@/utils/storage";

// Constants
const PROMO_CODE_VALIDITY_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Create MMKV storage adapter for Zustand with logging and error handling
const mmkvStorage = {
  getItem: (name: string): string | null => {
    try {
      const value = storage.getString(name);
      if (__DEV__) {
        console.log(`[MMKV] getItem("${name}") →`, value ?? null);
      }
      return value ?? null;
    } catch (error) {
      if (__DEV__) {
        console.error(`[MMKV] Error getting item "${name}":`, error);
      }
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      if (__DEV__) {
        console.log(`[MMKV] setItem("${name}") →`, value);
      }
      storage.set(name, value);
    } catch (error) {
      if (__DEV__) {
        console.error(`[MMKV] Error setting item "${name}":`, error);
      }
    }
  },
  removeItem: (name: string): void => {
    try {
      if (__DEV__) {
        console.log(`[MMKV] removeItem("${name}")`);
      }
      storage.remove(name);
    } catch (error) {
      if (__DEV__) {
        console.error(`[MMKV] Error removing item "${name}":`, error);
      }
    }
  },
};

interface PaymentState {
  email: string;
  name: string;
  promoCode: string | null;
  promoCodeCreatedAt: number | null;
  isDiscountActive: boolean;
  checkoutPriceSnapshot: number | null; // Locked price when entering checkout
  checkoutDiscountActive: boolean | null; // Locked discount state when entering checkout
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPromoCode: (code: string, createdAt: number) => void;
  checkPromoCodeValidity: () => void;
  setCheckoutPriceSnapshot: (price: number, isDiscountActive: boolean) => void;
  clearCheckoutPriceSnapshot: () => void;
  reset: () => void;
  logMMKV_Zustand: () => void;
}

// Internal interface with private methods (not exported)
interface PaymentStateInternal extends PaymentState {
  logState: () => void;
  logMMKV: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      email: "",
      name: "",
      promoCode: null,
      promoCodeCreatedAt: null,
      isDiscountActive: false,
      checkoutPriceSnapshot: null,
      checkoutDiscountActive: null,

      logState: () => {
        if (!__DEV__) return;
        const state = get();
        console.log("=== Zustand Payment Store State ===");
        console.log("Email:", state.email);
        console.log("Name:", state.name);
        console.log("Promo Code:", state.promoCode);
        console.log("Promo Code Created At:", state.promoCodeCreatedAt);
        console.log("Is Discount Active:", state.isDiscountActive);
        console.log("===================================");
      },

      logMMKV: () => {
        if (!__DEV__) return;
        const persistedData = storage.getString("payment-storage");
        console.log("=== MMKV Storage (Raw) ===");
        console.log("Key: payment-storage");
        console.log("Raw Value:", persistedData || "not set");
        if (persistedData) {
          try {
            const parsed = JSON.parse(persistedData);
            console.log("Parsed Value:", parsed);
            console.log("State:", parsed.state);
          } catch (e) {
            console.error("Parse Error:", e);
            console.warn(
              "Corrupted storage data detected. Consider resetting storage."
            );
          }
        }
        console.log("==========================");
      },

      logMMKV_Zustand: () => {
        if (!__DEV__) return;
        console.log("\n🔍 === COMPREHENSIVE LOG === 🔍\n");
        (get() as PaymentStateInternal).logState();
        (get() as PaymentStateInternal).logMMKV();
        console.log("\n✅ === END LOG === ✅\n");
      },

      setEmail: (email: string) => {
        set({ email });
      },

      setName: (name: string) => {
        set({ name });
      },

      setPromoCode: (code: string, createdAt: number) => {
        set({ promoCode: code, promoCodeCreatedAt: createdAt });
        get().checkPromoCodeValidity();
      },

      checkPromoCodeValidity: () => {
        const { promoCodeCreatedAt } = get();
        if (!promoCodeCreatedAt) {
          set({ isDiscountActive: false });
          return;
        }

        const now = Date.now();
        const isValid =
          now - promoCodeCreatedAt < PROMO_CODE_VALIDITY_DURATION_MS;

        set({ isDiscountActive: isValid });
      },

      setCheckoutPriceSnapshot: (price: number, isDiscountActive: boolean) => {
        set({
          checkoutPriceSnapshot: price,
          checkoutDiscountActive: isDiscountActive,
        });
      },

      clearCheckoutPriceSnapshot: () => {
        set({
          checkoutPriceSnapshot: null,
          checkoutDiscountActive: null,
        });
      },

      reset: () => {
        set({
          email: "",
          name: "",
          promoCode: null,
          promoCodeCreatedAt: null,
          isDiscountActive: false,
          checkoutPriceSnapshot: null,
          checkoutDiscountActive: null,
        });
      },
    }),
    {
      name: "payment-storage", // MMKV key name
      storage: createJSONStorage(() => mmkvStorage),
      // Persist email, name, promoCode, and promoCodeCreatedAt for timer persistence
      partialize: (state) => ({
        email: state.email,
        name: state.name,
        promoCode: state.promoCode,
        promoCodeCreatedAt: state.promoCodeCreatedAt,
      }),
      // Check promo code validity after rehydration
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          if (__DEV__) {
            console.error("[Zustand] Rehydration error:", error);
          }
          // Reset to default state on rehydration error
          return {
            email: "",
            name: "",
            promoCode: null,
            promoCodeCreatedAt: null,
            isDiscountActive: false,
          };
        }
        if (state) {
          state.checkPromoCodeValidity();
        }
      },
    }
  )
);
