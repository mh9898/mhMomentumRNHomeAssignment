/**
 * Payment formatting utilities
 * Handles formatting and validation of payment form inputs
 */

// Constants
const CARD_NUMBER_MAX_LENGTH = 19; // 16 digits + 3 spaces
const CVV_MAX_LENGTH = 4;

/**
 * Formats a card number by adding spaces every 4 digits
 * Removes all non-digit characters and limits to maximum length
 *
 * @param text - Raw card number input
 * @returns Formatted card number with spaces (e.g., "1234 5678 9012 3456")
 *
 * @example
 * formatCardNumber("1234567890123456") // "1234 5678 9012 3456"
 * formatCardNumber("1234-5678-9012-3456") // "1234 5678 9012 3456"
 */
export const formatCardNumber = (text: string): string => {
  // Remove all non-digits
  const cleaned = text.replace(/\D/g, "");
  // Add spaces every 4 digits
  const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
  return formatted.substring(0, CARD_NUMBER_MAX_LENGTH);
};

/**
 * Formats and validates an expiry date input
 * Validates month (01-12) and formats as MM/YY
 *
 * Rules:
 * - First digit must be 0 or 1 (for months 01-12)
 * - If first digit is 0, second digit must be 1-9 (01-09)
 * - If first digit is 1, second digit must be 0-2 (10-12)
 * - Formats as MM/YY when 2+ digits are entered
 *
 * @param text - Raw expiry date input
 * @returns Formatted expiry date (e.g., "12/25") or partial input if invalid
 *
 * @example
 * formatExpiryDate("1225") // "12/25"
 * formatExpiryDate("1325") // "1" (invalid month)
 * formatExpiryDate("0025") // "0" (invalid month)
 */
export const formatExpiryDate = (text: string): string => {
  // Remove all non-digits
  const cleaned = text.replace(/\D/g, "");

  // If we have at least 1 digit, validate the first digit
  if (cleaned.length >= 1) {
    const firstDigit = cleaned[0];
    // First digit can only be 0 or 1 (for months 01-12)
    if (firstDigit !== "0" && firstDigit !== "1") {
      return ""; // Reject invalid first digit
    }
  }

  // If we have 2 digits, validate the month (01-12)
  if (cleaned.length >= 2) {
    const firstDigit = cleaned[0];
    const secondDigit = cleaned[1];

    // Validate month based on first digit
    if (firstDigit === "0") {
      // If first digit is 0, second digit can be 1-9 (01-09)
      if (secondDigit === "0") {
        return cleaned[0]; // Reject "00", keep only "0"
      }
    } else if (firstDigit === "1") {
      // If first digit is 1, second digit can be 0-2 (10-12)
      if (parseInt(secondDigit, 10) > 2) {
        return cleaned[0]; // Reject invalid second digit (13-19), keep only "1"
      }
    }

    // Month is valid, format with slash
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  }

  return cleaned;
};

/**
 * Formats CVV by removing all non-digit characters
 * Limits to maximum length (typically 3-4 digits)
 *
 * @param text - Raw CVV input
 * @returns Formatted CVV with only digits (max 4 characters)
 *
 * @example
 * formatCVV("123") // "123"
 * formatCVV("1234") // "1234"
 * formatCVV("abc123") // "123"
 */
export const formatCVV = (text: string): string => {
  // Only allow digits, max 4 characters
  return text.replace(/\D/g, "").substring(0, CVV_MAX_LENGTH);
};
