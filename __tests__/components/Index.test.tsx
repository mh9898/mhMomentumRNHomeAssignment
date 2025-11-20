import { render, screen } from "@testing-library/react-native";
import React from "react";
import Index from "../../app/index";

// Mock expo-router
jest.mock("expo-router", () => ({
  Redirect: ({ href }: { href: string }) => {
    const React = require("react");
    return React.createElement("View", { testID: `redirect-${href}` });
  },
}));

describe("Index Component", () => {
  it("should render redirect to email screen", () => {
    render(<Index />);
    expect(screen.getByTestId("redirect-/(app)/(payment)/email")).toBeTruthy();
  });

  it("should render a View container", () => {
    render(<Index />);
    // Verify component renders without errors by checking for redirect element
    expect(screen.getByTestId("redirect-/(app)/(payment)/email")).toBeTruthy();
  });
});
