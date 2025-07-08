import OrderStatusChangeTemplate from "@/components/email/OrderStatusChangeTemplate";
import { editOrderStatus } from "@/lib/api/admin/orders/edit-order-status";
import { sendEmail } from "@/lib/resend/send-email";
import { OrderStatusPayload } from "@/types/order/order-status-payload";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body: OrderStatusPayload = await req.json();

  const { orderId, newStatus, customerEmail, orderRef } = body;

  const response = await editOrderStatus(orderId, newStatus);

  if (!response.success) {
    return NextResponse.json({ error: response.message }, { status: 400 });
  }
  try {
    await sendEmail(
      [customerEmail],
      "Your order's status has been changed,",
      OrderStatusChangeTemplate,
      { orderRef, newStatus }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unexpected Error Occurred" },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true, data: true }, { status: 200 });
};
