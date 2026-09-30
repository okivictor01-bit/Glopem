import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Paystack sends events (e.g. charge.success) to this endpoint.
// Configure this URL in your Paystack dashboard:
//   https://yourdomain.com/api/paystack-webhook
//
// Security: NEVER trust this payload without verifying the signature below.
// The frontend "callback" in GiveButton.tsx is NOT sufficient on its own —
// it can be spoofed by anyone. This route is the actual source of truth.

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const expectedSignature = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    // Double-check with Paystack's verify endpoint as a second safeguard
    // (defends against a compromised secret or a replayed payload).
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const verifyData = await verifyRes.json();

    if (verifyData.data?.status === "success") {
      await supabaseAdmin
        .from("donations")
        .update({ status: "success" })
        .eq("paystack_reference", reference);

      // Optional: trigger an email receipt here via Resend/SendGrid/etc.
    } else {
      await supabaseAdmin
        .from("donations")
        .update({ status: "failed" })
        .eq("paystack_reference", reference);
    }
  }

  // Always respond 200 quickly so Paystack doesn't retry unnecessarily.
  return NextResponse.json({ received: true });
}
