import { createMMKV } from "react-native-mmkv";

// Create MMKV storage instance
export const storage = createMMKV({
  id: "payment-storage",
});

// Email storage helpers
export const saveEmail = (email: string): void => {
  storage.set("user.email", email);
};

export const getEmail = (): string | undefined => {
  return storage.getString("user.email");
};

export const clearEmail = (): void => {
  storage.remove("user.email");
};

// Name storage helpers
export const saveName = (name: string): void => {
  storage.set("user.name", name);
};

export const getName = (): string | undefined => {
  return storage.getString("user.name");
};

// Purchase storage helpers
export interface PurchaseData {
  name: string;
  email: string;
  amount: number;
  timestamp: number;
}

export const savePurchase = (purchase: PurchaseData): void => {
  storage.set("purchase", JSON.stringify(purchase));
};

export const getPurchase = (): PurchaseData | null => {
  const purchaseStr = storage.getString("purchase");
  if (!purchaseStr) return null;
  return JSON.parse(purchaseStr);
};

export const clearPurchase = (): void => {
  storage.remove("purchase");
};

export const logAllStorage = (): void => {
  console.log("=== MMKV Storage Contents ===");
  console.log("Email:", storage.getString("user.email") || "not set");
  console.log("Name:", storage.getString("user.name") || "not set");
  const purchase = storage.getString("purchase");
  console.log("Purchase:", purchase ? JSON.parse(purchase) : "not set");
  console.log("=============================");
};
