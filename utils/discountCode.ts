/**
 * Generates a discount code in the format [name]_[month][lastTwoDigitsOfYear]
 * @param name - User's name (will be sanitized to remove spaces and special characters)
 * @returns Discount code string in format name_monthyear (e.g., "johndoe_1224")
 */
export const generateDiscountCode = (name: string): string => {
  // Sanitize name: remove spaces, convert to lowercase, keep only alphabetic characters
  const sanitizedName = name
    .trim()
    .replace(/\s+/g, "") // Remove spaces entirely
    .replace(/[^a-zA-Z]/g, "") // Remove any non-alphabetic characters
    .toLowerCase();

  // Get current month and last two digits of year
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 1-12 -> 01-12
  const year = now.getFullYear().toString().slice(-2); // e.g., "2024" -> "24"

  // Format: name_monthyear (e.g., "johndoe_1224")
  return `${sanitizedName}_${month}${year}`;
};
