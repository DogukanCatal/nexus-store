import { ProductPayload } from "@/types/create-or-edit-product";
import { NextResponse } from "next/server";
import { supabaseServiceClient } from "@/lib/supabase/service";

export async function POST(req: Request) {
  const body: ProductPayload = await req.json();
  const { data, allImages, product } = body;

  const productId = product?.id || crypto.randomUUID();

  const finalData = {
    ...data,
    ...(product?.id ? { id: product.id } : {}),
    images: allImages,
    id: productId,
  };

  //   console.log("Final Payload to RPC:", finalData);

  const { error } = await supabaseServiceClient.rpc(
    "create_or_update_product",
    {
      product_input: finalData,
    }
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: true }, { status: 200 });
}
