/**
 * Validates name format
 * @param name - Name string to validate
 * @returns true if name is valid (only alphabetic characters, minimum 3 characters), false otherwise
 */
export const isValidName = (name: string): boolean => {
  if (!name || name.trim().length < 3) {
    return false;
  }

  // Only alphabetic characters (a-z, A-Z) and spaces allowed
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim());
};

