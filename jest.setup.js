import "@testing-library/jest-native/extend-expect";

// Mock Expo modules if needed
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {},
  },
}));
