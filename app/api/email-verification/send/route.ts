import EmailVerificationTemplate from "@/components/email/EmailVerificationTemplate";
import { verifyCaptcha } from "@/lib/recaptcha/verify-captcha";
import { sendEmail } from "@/lib/resend/send-email";
import { getIp } from "@/lib/upstash/get-ip";
import { ratelimit } from "@/lib/upstash/rate-limiter";
import { redis } from "@/lib/upstash/redis";
import { SendCode, sendCodeSchema } from "@/schemas/email/send-code-schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const ip = await getIp(req);
  if (!ip) {
    return NextResponse.json(
      { error: "IP could not be determined." },
      { status: 400 }
    );
  }
  const body: SendCode = await req.json();
  const parse = sendCodeSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { name, surname, email, recaptchaToken } = parse.data;

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests, please try again later.",
      },
      { status: 429 }
    );
  }

  const isHuman = await verifyCaptcha(recaptchaToken);
  if (!isHuman) {
    return NextResponse.json(
      {
        error: "Bot verification failed",
      },
      { status: 403 }
    );
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const result = await redis.set(`verify:${email}`, code, { ex: 300 });
  console.log(result);
  if (result != "OK") {
    return NextResponse.json(
      { error: "Redis code store failed!" },
      { status: 500 }
    );
  }

  try {
    await sendEmail(
      [email],
      "This is your Verification Code",
      EmailVerificationTemplate,
      {
        name,
        surname,
        code,
      }
    );
  } catch (err) {
    console.log("Email send error:", err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
};
