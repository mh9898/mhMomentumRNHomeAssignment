import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import ProductScreen from "@/app/(app)/(payment)/product";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { usePromoCode } from "@/hooks/use-promo-code";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { usePaymentStore } from "@/store/paymentStore";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock Zustand store (must be before ProductScreen import to prevent MMKV loading)
jest.mock("@/store/paymentStore", () => ({
  usePaymentStore: jest.fn(),
}));

// Mock hooks
jest.mock("@/hooks/use-theme-colors", () => ({
  useThemeColors: jest.fn(),
}));

jest.mock("@/hooks/use-product-pricing", () => ({
  useProductPricing: jest.fn(),
}));

jest.mock("@/hooks/use-promo-code", () => ({
  usePromoCode: jest.fn(),
}));

describe("ProductScreen", () => {
  const mockColors = {
    background: "#FFFFFF",
    text: "#000000",
    buttonBackground: "#007AFF",
    buttonText: "#FFFFFF",
    border: "#E0E0E0",
    icon: "#999999",
    error: "#FF0000",
    success: "#00FF00",
    planCardBorder: "#CCCCCC",
    radioButtonBackground: "#F0F0F0",
    popularBannerBackground: "#FFE5E5",
    popularBannerText: "#FF0000",
    promoSectionBackground: "#F5F5F5",
    promoSectionBorder: "#DDDDDD",
    promoDashDotBackground: "#FFFFFF",
    promoDashedLineBackground: "#EEEEEE",
    promoDashBackground: "#CCCCCC",
    promoCodeInputBorder: "#DDDDDD",
    timerBoxBackground: "#FFFFFF",
  };

  const mockSetCheckoutPriceSnapshot = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemeColors as jest.Mock).mockReturnValue(mockColors);
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 50.0,
      dailyPrice: "1.79",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: false,
    });
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: null,
      isDiscountActive: false,
      minutes: "00",
      seconds: "00",
      timeRemaining: 0,
    });
    (usePaymentStore as unknown as jest.Mock).mockReturnValue({
      setCheckoutPriceSnapshot: mockSetCheckoutPriceSnapshot,
    });
  });

  // Test 1: Renders the screen with title
  it("should render the screen with correct title", () => {
    render(<ProductScreen />);

    expect(screen.getByText("Choose the best plan for you")).toBeTruthy();
  });

  // Test 2: Renders PlanCard component
  it("should render PlanCard component", () => {
    render(<ProductScreen />);

    expect(screen.getByText("4 WEEK PLAN")).toBeTruthy();
    expect(screen.getByText("MOST POPULAR")).toBeTruthy();
  });

  // Test 3: Displays correct price when discount is not active
  it("should display original price when discount is not active", () => {
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 50.0,
      dailyPrice: "1.79",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: false,
    });

    render(<ProductScreen />);

    expect(screen.getByText("50.00 USD")).toBeTruthy();
    expect(screen.getByText("1.79")).toBeTruthy();
    expect(screen.getByText("per day")).toBeTruthy();
  });

  // Test 4: Displays discounted price when discount is active
  it("should display discounted price when discount is active", () => {
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 25.0,
      dailyPrice: "0.89",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: true,
    });
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "johndoe_1224",
      isDiscountActive: true,
      minutes: "04",
      seconds: "30",
      timeRemaining: 270000,
    });

    render(<ProductScreen />);

    expect(screen.getByText("25.00 USD")).toBeTruthy();
    expect(screen.getByText("0.89")).toBeTruthy();
    expect(screen.getByText("50.00 USD")).toBeTruthy(); // Original price with strikethrough
  });

  // Test 5: Shows PromoCodeSection when promo code is active
  it("should display PromoCodeSection when promo code is active and discount is active", () => {
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "johndoe_1224",
      isDiscountActive: true,
      minutes: "04",
      seconds: "30",
      timeRemaining: 270000,
    });

    render(<ProductScreen />);

    expect(screen.getByText("Your Promo Code is Applied!")).toBeTruthy();
    expect(screen.getByText("johndoe_1224")).toBeTruthy();
    expect(screen.getByText("04 : 30")).toBeTruthy();
    expect(screen.getByText("minutes")).toBeTruthy();
    expect(screen.getByText("seconds")).toBeTruthy();
  });

  // Test 6: Hides PromoCodeSection when promo code is null
  it("should not display PromoCodeSection when promo code is null", () => {
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: null,
      isDiscountActive: false,
      minutes: "00",
      seconds: "00",
      timeRemaining: 0,
    });

    render(<ProductScreen />);

    expect(screen.queryByText("Your Promo Code is Applied!")).toBeNull();
  });

  // Test 7: Hides PromoCodeSection when discount is not active even if promo code exists
  it("should not display PromoCodeSection when discount is not active even if promo code exists", () => {
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "johndoe_1224",
      isDiscountActive: false,
      minutes: "00",
      seconds: "00",
      timeRemaining: 0,
    });

    render(<ProductScreen />);

    expect(screen.queryByText("Your Promo Code is Applied!")).toBeNull();
  });

  // Test 8: Renders Get My Plan button
  it("should render Get My Plan button", () => {
    render(<ProductScreen />);

    expect(screen.getByText("Get My Plan")).toBeTruthy();
  });

  // Test 8b: Calls setCheckoutPriceSnapshot and navigates when button is pressed
  it("should call setCheckoutPriceSnapshot and navigate when Get My Plan button is pressed", () => {
    render(<ProductScreen />);

    const button = screen.getByText("Get My Plan");
    fireEvent.press(button);

    expect(mockSetCheckoutPriceSnapshot).toHaveBeenCalledWith(50.0, false);
    expect(router.push).toHaveBeenCalledWith("./checkout");
  });

  // Test 9: PlanCard receives correct props when discount is active
  it("should pass correct props to PlanCard when discount is active", () => {
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 25.0,
      dailyPrice: "0.89",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: true,
    });
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "johndoe_1224",
      isDiscountActive: true,
      minutes: "04",
      seconds: "30",
      timeRemaining: 270000,
    });

    render(<ProductScreen />);

    // Verify discounted price is displayed
    expect(screen.getByText("25.00 USD")).toBeTruthy();
    // Verify original price with strikethrough is displayed
    expect(screen.getByText("50.00 USD")).toBeTruthy();
  });

  // Test 10: PlanCard receives correct props when discount is not active
  it("should pass correct props to PlanCard when discount is not active", () => {
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 50.0,
      dailyPrice: "1.79",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: false,
    });

    render(<ProductScreen />);

    // Verify original price is displayed
    expect(screen.getByText("50.00 USD")).toBeTruthy();
    // Verify original price with strikethrough is NOT displayed (should only appear once as current price)
    const originalPriceElements = screen.queryAllByText("50.00 USD");
    expect(originalPriceElements.length).toBe(1);
  });

  // Test 11: PromoCodeSection receives correct timer values
  it("should pass correct timer values to PromoCodeSection", () => {
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "testcode_1234",
      isDiscountActive: true,
      minutes: "02",
      seconds: "15",
      timeRemaining: 135000,
    });

    render(<ProductScreen />);

    expect(screen.getByText("testcode_1234")).toBeTruthy();
    expect(screen.getByText("02 : 15")).toBeTruthy();
  });

  // Test 12: Component uses theme colors correctly
  it("should use theme colors from useThemeColors hook", () => {
    render(<ProductScreen />);

    expect(useThemeColors).toHaveBeenCalled();
  });

  // Test 13: Component uses product pricing hook correctly
  it("should use product pricing hook", () => {
    render(<ProductScreen />);

    expect(useProductPricing).toHaveBeenCalled();
  });

  // Test 14: Component uses promo code hook correctly
  it("should use promo code hook", () => {
    render(<ProductScreen />);

    expect(usePromoCode).toHaveBeenCalled();
  });

  // Test 15: Renders all main elements together
  it("should render all main elements: title, plan card, and button", () => {
    render(<ProductScreen />);

    expect(screen.getByText("Choose the best plan for you")).toBeTruthy();
    expect(screen.getByText("4 WEEK PLAN")).toBeTruthy();
    expect(screen.getByText("Get My Plan")).toBeTruthy();
  });

  // Test 16: Timer displays correctly with single digit minutes and seconds
  it("should display timer with padded zeros correctly", () => {
    (usePromoCode as jest.Mock).mockReturnValue({
      promoCode: "testcode_5678",
      isDiscountActive: true,
      minutes: "00",
      seconds: "05",
      timeRemaining: 5000,
    });

    render(<ProductScreen />);

    expect(screen.getByText("00 : 05")).toBeTruthy();
  });

  // Test 17: Daily price displays correctly
  it("should display daily price correctly", () => {
    (useProductPricing as jest.Mock).mockReturnValue({
      displayPrice: 50.0,
      dailyPrice: "1.79",
      originalPrice: 50.0,
      discountedPrice: 25.0,
      isDiscountActive: false,
    });

    render(<ProductScreen />);

    expect(screen.getByText("1.79")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();
  });
});
