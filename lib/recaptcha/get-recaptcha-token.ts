declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}
export {};
export const getRecaptchaToken = async (action: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      return reject(new Error("reCAPTCHA not initialized properly"));
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action }
        );
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
};
