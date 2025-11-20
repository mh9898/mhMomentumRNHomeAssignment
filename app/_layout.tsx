import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// TODO: Uncomment the following code once you've added the Gothic A1 font files to assets/fonts/
// See assets/fonts/README.md for instructions

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "GothicA1-Regular": require("@/assets/fonts/GothicA1-Regular.ttf"),
    "GothicA1-Medium": require("@/assets/fonts/GothicA1-Medium.ttf"),
    "GothicA1-SemiBold": require("@/assets/fonts/GothicA1-SemiBold.ttf"),
    "GothicA1-Bold": require("@/assets/fonts/GothicA1-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // useEffect(() => {
  //   // Log MMKV and Zustand state after hydration completes
  //   // Small delay to ensure Zustand persistence middleware has finished hydrating
  //   const timer = setTimeout(() => {
  //     console.log("\n🚀 === APP START - STATE LOG === 🚀\n");
  //     usePaymentStore.getState().logMMKV_Zustand();
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, []);

  return <Slot />;
}
