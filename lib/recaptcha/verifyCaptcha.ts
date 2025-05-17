export async function verifyCaptcha(recaptchaToken: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${recaptchaToken}`,
  });
  const data = await res.json();
  return data.success && data.score > 0.5;
}
