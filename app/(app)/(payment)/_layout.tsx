import { Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { normalizeFont } from "@/utils/responsiveText";
import { Stack } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const momentumLogo = require("@/assets/images/Logo_Momentum.png");
const momentumLogoWhite = require("@/assets/images/Logo_Momentum_white.png");

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 30;
const ANDROID_HEADER_MARGIN = 40;

interface LogoHeaderProps {
  includeAndroidMargin?: boolean;
}

const LogoHeader = ({ includeAndroidMargin = false }: LogoHeaderProps) => {
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "dark" ? momentumLogoWhite : momentumLogo;

  return (
    <View
      style={[
        styles.logoContainer,
        includeAndroidMargin && styles.logoContainerWithMargin,
      ]}
    >
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const CheckoutHeader = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.checkoutHeaderContainer}>
      <Text style={[styles.checkoutHeaderText, { color: colors.text }]}>
        Complete Checkout
      </Text>
    </View>
  );
};

const PaymentLayout = () => {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => <LogoHeader includeAndroidMargin />,
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
      <Stack.Screen
        name="email"
        options={{
          headerTitle: () => <LogoHeader />,
        }}
      />
      <Stack.Screen name="name" />
      <Stack.Screen name="product" />
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: () => <CheckoutHeader />,
        }}
      />
      <Stack.Screen
        name="thank-you"
        options={{
          headerBackVisible: false,
          headerTitle: () => <LogoHeader />,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  logoContainerWithMargin: {
    marginRight: Platform.OS === "android" ? ANDROID_HEADER_MARGIN : 0,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  checkoutHeaderContainer: {
    alignItems: "center",
    marginRight: Platform.OS === "android" ? ANDROID_HEADER_MARGIN : 0,
  },
  checkoutHeaderText: {
    fontFamily: Fonts.gothicA1SemiBold,
    fontSize: normalizeFont(20),
    fontWeight: "bold",
  },
});

export default PaymentLayout;
