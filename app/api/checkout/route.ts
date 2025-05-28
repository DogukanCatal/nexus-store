import OrderConfirmationTemplate from "@/components/email/OrderConfirmationTemplate";
import { verifyCaptcha } from "@/lib/recaptcha/verify-captcha";
import { sendEmail } from "@/lib/resend/send-email";
import { supabaseServiceClient } from "@/lib/supabase/server";
import { getIp } from "@/lib/upstash/get-ip";
import { ratelimitCheckout } from "@/lib/upstash/rate-limiter";
import {
  CheckoutPayload,
  checkoutPayloadSchema,
} from "@/schemas/checkout-payload-schema";
import type { OrderConfirmationProps } from "@/types/emails/order-confirmation";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const ip = await getIp(req);
  if (!ip) {
    return NextResponse.json(
      { error: "IP could not be determined." },
      { status: 400 }
    );
  }
  const body: CheckoutPayload = await req.json();
  const parse = checkoutPayloadSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  const { name, surname, email, phone, address, city, items, recaptchaToken } =
    parse.data;

  const { success } = await ratelimitCheckout.limit(ip);
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests, please try again later.",
      },
      { status: 429 }
    );
  }
  console.log(recaptchaToken);
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
    await supabaseServiceClient.rpc("create_order", {
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

  if (data) {
    try {
      await sendEmail(
        [email],
        "Thank you for your order. Your items are listed below.",
        OrderConfirmationTemplate,
        data
      );
    } catch (err) {
      console.log("Email send error: ", err);
    }
    return NextResponse.json(
      { success: true, data: data.order_ref },
      { status: 200 }
    );
  }

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected Error Occurred" },
      { status: 400 }
    );
  }
}
