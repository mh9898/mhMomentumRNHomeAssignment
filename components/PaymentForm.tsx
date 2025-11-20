import AppTextInput from "@/components/AppTextInput";
import { Colors, Fonts } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";

const cardIcon = require("@/assets/icons/icon_card.png");

interface PaymentFormProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  onCardNumberChange: (text: string) => void;
  onExpiryDateChange: (text: string) => void;
  onCVVChange: (text: string) => void;
  onNameOnCardChange: (text: string) => void;
  onInputFocus: () => void;
  onCardNumberBlur?: () => void;
  onExpiryDateBlur?: () => void;
  onCvvBlur?: () => void;
  isExpiryDateInvalid?: boolean;
  isCardNumberInvalid?: boolean;
  isCvvInvalid?: boolean;
}

export default function PaymentForm({
  cardNumber,
  expiryDate,
  cvv,
  nameOnCard,
  onCardNumberChange,
  onExpiryDateChange,
  onCVVChange,
  onNameOnCardChange,
  onInputFocus,
  onCardNumberBlur,
  onExpiryDateBlur,
  onCvvBlur,
  isExpiryDateInvalid = false,
  isCardNumberInvalid = false,
  isCvvInvalid = false,
}: PaymentFormProps) {
  const colors = useThemeColors();
  const styles = useMemo(
    () =>
      createStyles(
        colors,
        isExpiryDateInvalid,
        isCardNumberInvalid,
        isCvvInvalid
      ),
    [colors, isExpiryDateInvalid, isCardNumberInvalid, isCvvInvalid]
  );

  return (
    <View>
      {/* Credit Card Number */}
      <View style={styles.cardNumberContainer}>
        <AppTextInput
          placeholder="Credit Card"
          value={cardNumber}
          onChangeText={onCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
          style={[
            styles.cardNumberInput,
            isCardNumberInvalid && styles.cardNumberInputInvalid,
          ]}
          onFocus={onInputFocus}
          onBlur={onCardNumberBlur}
        />
        <Image source={cardIcon} style={styles.cardIcon} resizeMode="contain" />
      </View>

      {/* Expiry and CVV */}
      <View style={styles.rowInputs}>
        <AppTextInput
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={onExpiryDateChange}
          keyboardType="numeric"
          maxLength={5}
          style={[
            styles.halfInput,
            isExpiryDateInvalid && styles.expiryInputInvalid,
          ]}
          onFocus={onInputFocus}
          onBlur={onExpiryDateBlur}
        />
        <AppTextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={onCVVChange}
          keyboardType="numeric"
          maxLength={4}
          style={[styles.halfInput, isCvvInvalid && styles.cvvInputInvalid]}
          onFocus={onInputFocus}
          onBlur={onCvvBlur}
        />
      </View>

      {/* Name on Card */}
      <AppTextInput
        placeholder="Name on card"
        value={nameOnCard}
        onChangeText={onNameOnCardChange}
        autoCapitalize="words"
        style={styles.nameOnCardInput}
        onFocus={onInputFocus}
      />
    </View>
  );
}

const createStyles = (
  colors: typeof Colors.light,
  isExpiryDateInvalid: boolean,
  isCardNumberInvalid: boolean,
  isCvvInvalid: boolean
) => {
  return StyleSheet.create({
    cardNumberContainer: {
      position: "relative",
    },
    cardNumberInput: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 15,
      fontWeight: "500",
      paddingRight: 50,
      textAlign: "left",
      height: 54,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    cardNumberInputInvalid: {
      backgroundColor: colors.errorBackground,
      borderColor: colors.error,
      borderBottomColor: colors.error,
    },
    cardIcon: {
      position: "absolute",
      right: 16,
      top: 17,
      width: 20,
      height: 20,
    },
    rowInputs: {
      flex: 1,
      flexDirection: "row",
      gap: 12,
    },
    halfInput: {
      flex: 1,
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 15,
      fontWeight: "500",
      textAlign: "left",
      height: 54,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingRight: 92,
      paddingLeft: 16,
      backgroundColor: colors.background,
    },
    nameOnCardInput: {
      fontFamily: Fonts.gothicA1Medium,
      fontSize: 15,
      fontWeight: "500",
      textAlign: "left",
      height: 54,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    expiryInputInvalid: {
      backgroundColor: colors.errorBackground,
      borderColor: colors.error,
      borderBottomColor: colors.error,
    },
    cvvInputInvalid: {
      backgroundColor: colors.errorBackground,
      borderColor: colors.error,
      borderBottomColor: colors.error,
    },
  });
};
