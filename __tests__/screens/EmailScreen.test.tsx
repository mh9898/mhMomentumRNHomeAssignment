import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import EmailScreen from "../../app/(app)/(payment)/email";
import { usePaymentStore } from "../../store/paymentStore";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock Zustand store
jest.mock("../../store/paymentStore", () => ({
  usePaymentStore: jest.fn(),
}));

describe("EmailScreen", () => {
  const mockSetEmail = jest.fn();
  const mockLogMMKV_Zustand = jest.fn();
  const mockEmail = "";

  beforeEach(() => {
    jest.clearAllMocks();
    (usePaymentStore as jest.Mock).mockReturnValue({
      email: mockEmail,
      setEmail: mockSetEmail,
      logMMKV_Zustand: mockLogMMKV_Zustand,
    });
  });

  // Test 1: Invalid email shows error message
  it("should display error message when email is invalid", async () => {
    render(<EmailScreen />);

    const emailInput = screen.getByPlaceholderText(/name@domain\.com/i);

    // Enter invalid email
    fireEvent.changeText(emailInput, "invalid-email");

    // Wait for validation
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeTruthy();
    });
  });

  // Test 2: Continue button is disabled when email is invalid
  it("should disable Continue button when email is invalid", async () => {
    render(<EmailScreen />);

    const emailInput = screen.getByPlaceholderText(/name@domain\.com/i);
    const continueButton = screen.getByText(/continue/i);

    // Enter invalid email
    fireEvent.changeText(emailInput, "invalid-email");

    // Wait for validation
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeTruthy();
    });

    // Get the parent TouchableOpacity to check disabled state
    const touchableOpacity = continueButton.parent?.parent;
    const isDisabled =
      touchableOpacity?.props?.disabled ||
      touchableOpacity?.props?.accessibilityState?.disabled;

    // Button should be disabled
    expect(isDisabled).toBeTruthy();

    // Try to press it - should not navigate
    fireEvent.press(continueButton);
    expect(router.push).not.toHaveBeenCalled();
  });

  // Test 3: Valid email enables Continue button and navigates/stores email
  it("should enable Continue button, store email, and navigate when email is valid", async () => {
    render(<EmailScreen />);

    const emailInput = screen.getByPlaceholderText(/name@domain\.com/i);
    const continueButton = screen.getByText(/continue/i);
    const validEmail = "alex@heymomentum.io";

    // Enter valid email
    fireEvent.changeText(emailInput, validEmail);

    // Wait for validation to pass
    await waitFor(() => {
      expect(screen.queryByText("Please enter a valid email")).toBeNull();
    });

    // Get the parent TouchableOpacity to check disabled state
    const touchableOpacity = continueButton.parent?.parent;
    const isDisabled =
      touchableOpacity?.props?.disabled ||
      touchableOpacity?.props?.accessibilityState?.disabled;

    // Button should be enabled
    expect(isDisabled).toBeFalsy();

    // Press Continue button
    fireEvent.press(continueButton);

    // Should save email to store
    expect(mockSetEmail).toHaveBeenCalledWith(validEmail);

    // Should navigate to name screen
    expect(router.push).toHaveBeenCalledWith("./name");
  });
});
