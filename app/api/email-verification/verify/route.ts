import { ratelimitEmailVerifyCode } from "@/lib/upstash/rate-limiter";
import { redis } from "@/lib/upstash/redis";
import {
  VerifyCode,
  verifyCodeSchema,
} from "@/schemas/email/verify-code-schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body: VerifyCode = await req.json();
  const parse = verifyCodeSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { email, code } = parse.data;

  const { success } = await ratelimitEmailVerifyCode.limit(email);
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests, please try again later.",
      },
      { status: 429 }
    );
  }

  const storedCodeRaw = await redis.get<string>(`verify:${email}`);
  const storedCode = String(storedCodeRaw);
  if (!storedCode) {
    return NextResponse.json({ error: "Code Expired" }, { status: 400 });
  }
  if (storedCode !== code) {
    console.log("typeof", typeof storedCode, storedCode, code);
    return NextResponse.json({ error: "Incorrect Code" }, { status: 400 });
  }

  await redis.del(`verify:${email}`);

  return NextResponse.json(
    { success: true, data: parse.data },
    { status: 200 }
  );
};
