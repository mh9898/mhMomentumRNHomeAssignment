# Welcome to your Momentum app 👋

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

## Demo

https://github.com/user-attachments/assets/ae48bbd0-4ba3-422c-9894-2348344cc99f

## Features

This project includes the following features and implementations:

### State Management

- **Zustand Store** (`store/paymentStore.ts`): Global state management for payment flow
  - Manages email, name, and promo code state
  - Integrated with MMKV for persistent storage
  - Includes promo code validation with 5-minute expiration
  - Checkout price snapshot functionality to lock prices during checkout
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

- **usePaymentForm** (`hooks/use-payment-form.ts`): Payment form management hook
  - Manages credit card form state (card number, expiry date, CVV, name on card)
  - Uses `paymentFormatting` utilities for automatic input formatting
  - Automatic formatting for card number (spaces every 4 digits) and expiry date (MM/YY)
  - Real-time form validation with touch-based error display (errors shown after blur)
  - Expiry date future validation (validates month range 01-12 and ensures date is not expired)
  - Loading state management during payment processing
  - Improved error handling with ref pattern to avoid stale closures
  - Specific error messages for expired cards and invalid form fields
  - Handles payment submission with simulated API call (90% success rate)
  - Navigation to thank you screen on successful payment
  - Automatic cleanup of checkout price snapshot on successful purchase

### Theme System

- **Theme Configuration** (`constants/theme.ts`): Complete light/dark mode support
  - Color definitions for light and dark themes
  - Custom Gothic A1 font family (Regular, Medium, SemiBold, Bold)
  - Extended color palette for plan cards, promo sections, timers, privacy statements, and UI elements
  - Privacy statement text color (`textPrivacyStatement`) for consistent styling
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

- **BuyNowButton** (`components/BuyNowButton.tsx`): Payment submission button component

  - Lock icon indicator for security (replaced with loading spinner during processing)
  - Loading state support with ActivityIndicator and dynamic text ("Processing..." vs "Buy Now")
  - Disabled state handling with visual feedback
  - Fully accessible with proper labels and states
  - Theme-aware styling with success color scheme

- **OrderSummary** (`components/OrderSummary.tsx`): Order details display component

  - Displays plan details and pricing
  - Shows discount information when active
  - Promo code display with coupon icon
  - Total price calculation and display
  - Savings message with fire icon indicator
  - Uses locked price snapshot to prevent price changes during checkout
  - Theme-aware styling

- **PaymentForm** (`components/PaymentForm.tsx`): Credit card input form component

  - Credit card number input with card icon
  - Expiry date input (MM/YY format)
  - CVV input field
  - Name on card input
  - Automatic input formatting
  - Keyboard-aware scrolling support
  - Theme-aware styling

- **PaymentMethods** (`components/PaymentMethods.tsx`): Payment method icons display

  - Displays supported payment method icons (Visa, Mastercard, Maestro, Amex, Discover)
  - Horizontal layout with proper spacing
  - Visual indication of accepted payment methods

- **AppTitle** (`components/AppTitle.tsx`): Reusable title component for screens

  - Customizable font size, line height, and text alignment
  - Configurable margins for flexible layout
  - Uses Gothic A1 SemiBold font family
  - Theme-aware text color
  - Used across Email and Name screens for consistent typography

- **ScreenTitle** (`components/ScreenTitle.tsx`): Screen title component

  - Similar to AppTitle with customizable styling options
  - Flexible margin and spacing configuration
  - Theme-aware styling with Gothic A1 SemiBold font
  - Supports custom text alignment and line height

- **PrivacyStatement** (`components/PrivacyStatement.tsx`): Privacy statement display component
  - Displays privacy message with lock icon indicator
  - Customizable text content with default message
  - Configurable margins for flexible positioning
  - Lock icon with theme-aware tint color
  - Used in Email and Name screens for consistent privacy messaging
  - Theme-aware text color using `textPrivacyStatement` color

### Screens

- **Email Screen** (`app/(app)/(payment)/email.tsx`): Email collection screen

  - Email validation with real-time feedback
  - Uses `AppTitle` component for consistent screen title styling
  - Uses `PrivacyStatement` component for privacy messaging
  - Navigation to Name screen

- **Name Screen** (`app/(app)/(payment)/name.tsx`): Name collection and discount code generation

  - Name validation (minimum 3 letters, alphabetic only)
  - Personalized discount code generation (format: `name_monthyear`)
  - Uses `AppTitle` component for consistent screen title styling
  - Uses `PrivacyStatement` component for privacy messaging
  - Navigation to Product screen

- **Product Screen** (`app/(app)/(payment)/product.tsx`): Product selection and pricing display

  - Displays plan card with pricing information
  - Shows promo code section when discount is active
  - Real-time price updates based on discount status
  - Daily price calculation and display
  - Keyboard-aware scrolling layout
  - Integrated with pricing and promo code hooks
  - Themed UI consistent with app design
  - Navigation to Checkout screen

- **Checkout Screen** (`app/(app)/(payment)/checkout.tsx`): Payment checkout screen

  - Order summary with locked pricing snapshot
  - Payment method icons display
  - Credit card form with validation
  - Buy Now button with form validation and loading state
  - Keyboard-aware scrolling with auto-scroll on input focus
  - Memory leak prevention with proper timeout cleanup on component unmount
  - Price locking mechanism to prevent changes during checkout
  - Integrated with payment form hook for state management
  - Theme-aware styling

- **Thank You Screen** (`app/(app)/(payment)/thank-you.tsx`): Payment confirmation screen
  - Success message display with themed styling
  - Keyboard-aware layout with proper scrolling support

### Utilities

- **Discount Code Generator** (`utils/discountCode.ts`): Generates personalized discount codes

  - Format: `name_monthyear` (e.g., `johndoe_1224`)
  - Sanitizes user input (removes spaces and special characters)
  - Uses current month and year for code generation

- **Name Validation** (`utils/nameValidation.ts`): Validates name input format

  - Minimum 3 characters requirement
  - Alphabetic characters and spaces only
  - Trims whitespace automatically

- **Email Validation** (`utils/emailValidation.ts`): Validates email input format

  - Standard email format validation
  - Real-time validation feedback

- **Payment Formatting** (`utils/paymentFormatting.ts`): Payment form input formatting utilities
  - `formatCardNumber`: Formats card numbers with spaces every 4 digits (e.g., "1234 5678 9012 3456")
    - Removes non-digit characters
    - Limits to maximum length (19 characters including spaces)
  - `formatExpiryDate`: Formats and validates expiry dates as MM/YY
    - Validates month range (01-12)
    - Rejects invalid month inputs in real-time
    - Automatically adds slash separator after month
  - `formatCVV`: Formats CVV input by removing non-digits
    - Limits to maximum length (4 characters)
    - Ensures numeric-only input
  - Comprehensive JSDoc documentation with examples
  - Used by `usePaymentForm` hook for consistent formatting across the app

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
  - CheckoutScreen component tests
    - Order summary rendering with locked prices
    - Discount and promo code display
    - Payment form validation and interaction
    - Buy Now button state management
    - Price snapshot functionality
    - Form input handlers
    - Keyboard handling
  - Utility function tests
  - Coverage reporting support

### Assets

- **Icons** (`assets/icons/`): Payment and UI icons

  - Payment method icons: Visa, Mastercard, Maestro, American Express, Discover
  - UI icons: Lock, Lock Gray, Card, Coupon, Fire, Arrow Right
  - PNG format with proper sizing for mobile display
  - Lock Gray icon used in PrivacyStatement component
  - Arrow Right icon used in AppButton component for navigation indicators

- **Images** (`assets/images/`): App branding and logo assets
  - Momentum logo (`Logo_Momentum.png`) for app branding
  - App icons and splash screen assets for iOS and Android

### Scripts

- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
