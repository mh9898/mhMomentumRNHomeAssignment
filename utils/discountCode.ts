/**
 * Generates a discount code in the format [name]_[month][year]
 * @param name - User's name (will be sanitized to remove spaces and special characters)
 * @returns Discount code string in format name_monthyear (e.g., "alex_nov25")
 */
export const generateDiscountCode = (name: string): string => {
  // Sanitize name: remove spaces, convert to lowercase, keep only alphabetic characters
  const sanitizedName = name
    .trim()
    .replace(/\s+/g, "") // Remove spaces entirely
    .replace(/[^a-zA-Z]/g, "") // Remove any non-alphabetic characters
    .toLowerCase();

  // Get current month (short lowercase) and last two digits of year
  const now = new Date();
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const month = monthNames[now.getMonth()]; // e.g., "nov"
  const year = now.getFullYear().toString().slice(-2); // e.g., "2025" -> "25"

  // Format: name_monthyear (e.g., "alex_nov25")
  return `${sanitizedName}_${month}${year}`;
};
