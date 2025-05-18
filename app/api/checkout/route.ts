import OrderConfirmationEmail from "@/components/email/OrderConfirmationEmail";
import { verifyCaptcha } from "@/lib/recaptcha/verifyCaptcha";
import { sendEmail } from "@/lib/resend/sendEmail";
import { getIp } from "@/lib/upstash/getIp";
import { ratelimit } from "@/lib/upstash/ratelimiter";
import {
  CheckoutPayload,
  checkoutPayloadSchema,
} from "@/schemas/checkoutPayloadSchema";
import { OrderConfirmationProps } from "@/types/emails/order-confirmation";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const ip = getIp(req);
  const body: CheckoutPayload = await req.json();
  const parse = checkoutPayloadSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { name, surname, email, phone, address, city, items, recaptchaToken } =
    parse.data;

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

  const {
    error,
    data,
  }: { error: PostgrestError | null; data: OrderConfirmationProps | null } =
    await supabase.rpc("create_order", {
      input_name: name,
      input_surname: surname,
      input_email: email,
      input_phone: phone,
      input_address: address,
      input_city: city,
      input_items: items,
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log(data);

  if (data) {
    try {
      await sendEmail(
        [email],
        "Thank you for your order. Your items are listed below.",
        OrderConfirmationEmail,
        data
      );
    } catch (err) {
      console.log("Email send error: ", err);
    }
  }

  return NextResponse.json({ success: true, data: data }, { status: 200 });
}
