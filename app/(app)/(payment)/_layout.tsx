import { Stack } from "expo-router";

export default function PaymentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Momentum",
      }}
    >
      <Stack.Screen name="email" />
    </Stack>
  );
}
