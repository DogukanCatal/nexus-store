import { PersistStorage } from "zustand/middleware";
import { encrypt, decrypt } from "./secure-storage";
import type { BasketStore } from "@/store/basket-store";

export const encryptedStorage: PersistStorage<BasketStore> = {
  getItem: (name) => {
    const encrypted = localStorage.getItem(name);
    if (!encrypted) return null;

    try {
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    const stringified = JSON.stringify(value);
    const encrypted = encrypt(stringified);
    localStorage.setItem(name, encrypted);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};
