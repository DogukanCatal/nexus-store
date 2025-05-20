import {
  VerifyCode,
  verifyCodeSchema,
} from "@/schemas/email/verify-code-schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body: VerifyCode = await req.json();
  const parse = verifyCodeSchema.safeParse(body);
  return NextResponse.json(
    { success: true, data: parse.data },
    { status: 200 }
  );
};
