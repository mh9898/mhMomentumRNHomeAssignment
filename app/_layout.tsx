import { Slot } from "expo-router";
import { useEffect } from "react";
import { usePaymentStore } from "../store/paymentStore";

export default function RootLayout() {
  useEffect(() => {
    // Log MMKV and Zustand state after hydration completes
    // Small delay to ensure Zustand persistence middleware has finished hydrating
    const timer = setTimeout(() => {
      console.log("\n🚀 === APP START - STATE LOG === 🚀\n");
      usePaymentStore.getState().logMMKV_Zustand();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <Slot />;
}
