import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../utils/storage";

// Create MMKV storage adapter for Zustand with logging
const mmkvStorage = {
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    console.log(`[MMKV] getItem("${name}") →`, value ?? null);
    return value ?? null;
  },
  setItem: (name: string, value: string): void => {
    console.log(`[MMKV] setItem("${name}") →`, value);
    storage.set(name, value);
  },
  removeItem: (name: string): void => {
    console.log(`[MMKV] removeItem("${name}")`);
    storage.remove(name);
  },
};

interface PaymentState {
  email: string;
  name: string;
  promoCode: string | null;
  promoCodeCreatedAt: number | null;
  isDiscountActive: boolean;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPromoCode: (code: string, createdAt: number) => void;
  checkPromoCodeValidity: () => void;
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

      logState: () => {
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
            console.log("Parse Error:", e);
          }
        }
        console.log("==========================");
      },

      logMMKV_Zustand: () => {
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
        const fiveMinutesInMs = 5 * 60 * 1000;
        const isValid = now - promoCodeCreatedAt < fiveMinutesInMs;

        set({ isDiscountActive: isValid });
      },

      reset: () => {
        set({
          email: "",
          name: "",
          promoCode: null,
          promoCodeCreatedAt: null,
          isDiscountActive: false,
        });
      },
    }),
    {
      name: "payment-storage", // MMKV key name
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist email and name - don't persist temporary promoCode
      partialize: (state) => ({
        email: state.email,
        name: state.name,
      }),
    }
  )
);
