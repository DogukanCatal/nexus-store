import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_ZUSTAND_SECRET_KEY ??
  "0123456789abcdef0123456789abcdef";

export const encrypt = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  } catch (err) {
    console.error("Encryption error:", err);
    return "";
  }
};

export const decrypt = (data: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (err) {
    console.error("Decryption error:", err);
    return "";
  }
};
