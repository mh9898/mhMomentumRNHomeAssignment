import { useThemeColors } from "@/hooks/use-theme-colors";
import { Stack } from "expo-router";

const PaymentLayout = () => {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Momentum",
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
