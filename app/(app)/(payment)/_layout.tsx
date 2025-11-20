import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Stack } from "expo-router";
import { Image } from "react-native";

const momentumLogo = require("@/assets/images/Logo_Momentum.png");
const momentumLogo_white = require("@/assets/images/Logo_Momentum_white.png");
const PaymentLayout = () => {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () =>
          colorScheme === "dark" ? (
            <Image
              source={momentumLogo_white}
              style={{ width: 120, height: 30 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={momentumLogo}
              style={{ width: 120, height: 30 }}
              resizeMode="contain"
            />
          ),
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="email" />
      <Stack.Screen name="name" />
      <Stack.Screen name="product" />
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: "Complete Checkout",
        }}
      />
      <Stack.Screen
        name="thank-you"
        options={{
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default PaymentLayout;
