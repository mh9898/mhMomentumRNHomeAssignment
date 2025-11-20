import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../constants/theme";
import { useThemeColors } from "../hooks/use-theme-colors";

const visaIcon = require("../assets/icons/icon_visa.png");
const mastercardIcon = require("../assets/icons/icon_mastercard.png");
const maestroIcon = require("../assets/icons/icon_maestro.png");
const amexIcon = require("../assets/icons/icon_amrican.png");
const discoverIcon = require("../assets/icons/icon_discover.png");

export default function PaymentMethods() {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.paymentMethods}>
      <Image
        source={visaIcon}
        style={styles.paymentIcon}
        resizeMode="contain"
      />
      <Image
        source={mastercardIcon}
        style={styles.paymentIcon}
        resizeMode="contain"
      />
      <Image
        source={maestroIcon}
        style={styles.paymentIcon}
        resizeMode="contain"
      />
      <Image
        source={amexIcon}
        style={styles.paymentIcon}
        resizeMode="contain"
      />
      <Image
        source={discoverIcon}
        style={styles.paymentIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) => {
  return StyleSheet.create({
    paymentMethods: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: 24,
      paddingVertical: 12,
    },
    paymentIcon: {
      width: 53,
      height: 36,
    },
  });
};
