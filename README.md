# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Prebuild native projects (iOS and Android)

   ```bash
   npx expo prebuild
   ```

3. Start the app

   ```bash
   npx expo run
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

This project includes the following features and implementations:

### State Management

- **Zustand Store** (`store/paymentStore.ts`): Global state management for payment flow
  - Manages email, name, and promo code state
  - Integrated with MMKV for persistent storage
  - Includes promo code validation with 5-minute expiration
  - Comprehensive logging utilities for debugging state and storage

### Storage

- **MMKV Integration** (`utils/storage.ts`): High-performance key-value storage
  - Persistent storage for user email and name
  - Purchase data storage helpers
  - Storage logging utilities

### Custom Hooks

- **useProductPricing** (`hooks/use-product-pricing.ts`): Product pricing calculation hook

  - Calculates display price based on discount state
  - Computes daily price breakdown (28-day plan)
  - Returns original price, discounted price, and current display price
  - Memoized for performance optimization

- **usePromoCode** (`hooks/use-promo-code.ts`): Promo code management hook
  - Manages 5-minute validity timer with real-time countdown
  - Formats timer display (MM:SS) with zero-padding
  - Checks promo code validity and updates discount state
  - Returns promo code, discount status, and formatted time remaining

### Theme System

- **Theme Configuration** (`constants/theme.ts`): Complete light/dark mode support
  - Color definitions for light and dark themes
  - Custom Gothic A1 font family (Regular, Medium, SemiBold, Bold)
  - Extended color palette for plan cards, promo sections, timers, and UI elements
  - Theme hooks (`hooks/use-theme-colors.ts`, `hooks/use-color-scheme.ts`) for accessing theme colors
  - Automatic color scheme detection based on system preferences

### UI Components

- **AppButton** (`components/AppButton.tsx`): Reusable themed button component

  - Supports disabled states with visual feedback
  - Optional arrow indicator
  - Fully accessible with proper labels and states
  - Automatically adapts to light/dark theme

- **AppTextInput** (`components/AppTextInput.tsx`): Themed text input component

  - Real-time validation with error states
  - Visual feedback for valid/invalid input
  - Error message display
  - Theme-aware styling

- **PlanCard** (`components/PlanCard.tsx`): Product plan display component

  - Displays 4-week plan pricing with original and discounted prices
  - Shows daily price breakdown
  - Visual discount indication with strikethrough pricing
  - "Most Popular" banner display
  - Radio button selection indicator
  - Fully accessible with proper ARIA labels
  - Theme-aware styling with custom colors

- **PromoCodeSection** (`components/PromoCodeSection.tsx`): Promo code display component
  - Displays applied promo code with checkmark indicator
  - Real-time countdown timer showing remaining validity time
  - Dashed border design with decorative elements
  - Timer formatting (MM:SS) with proper accessibility labels
  - Conditional rendering based on discount active state
  - Theme-aware styling with custom promo section colors

### Screens

- **Email Screen** (`app/(app)/(payment)/email.tsx`): Email collection screen

  - Email validation with real-time feedback
  - Privacy statement display
  - Navigation to Name screen

- **Name Screen** (`app/(app)/(payment)/name.tsx`): Name collection and discount code generation

  - Name validation (minimum 3 letters, alphabetic only)
  - Personalized discount code generation (format: `name_monthyear`)
  - Privacy statement display
  - Navigation to Product screen

- **Product Screen** (`app/(app)/(payment)/product.tsx`): Product selection and pricing display
  - Displays plan card with pricing information
  - Shows promo code section when discount is active
  - Real-time price updates based on discount status
  - Daily price calculation and display
  - Keyboard-aware scrolling layout
  - Integrated with pricing and promo code hooks
  - Themed UI consistent with app design

### Utilities

- **Discount Code Generator** (`utils/discountCode.ts`): Generates personalized discount codes

  - Format: `name_monthyear` (e.g., `johndoe_1224`)
  - Sanitizes user input (removes spaces and special characters)
  - Uses current month and year for code generation

- **Name Validation** (`utils/nameValidation.ts`): Validates name input format
  - Minimum 3 characters requirement
  - Alphabetic characters and spaces only
  - Trims whitespace automatically

### Testing

- **Jest Configuration**: Complete testing setup with React Native Testing Library
  - Test files in `__tests__/` directory
  - EmailScreen component tests
  - NameScreen component tests
  - ProductScreen component tests
    - Plan card rendering and pricing display
    - Promo code section conditional rendering
    - Discount state handling
    - Timer display formatting
    - Theme integration
  - Utility function tests
  - Coverage reporting support

### Scripts

- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
