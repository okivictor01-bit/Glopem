"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import churchConfig from "@/church.config";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function GiveButton() {
  const [category, setCategory] = useState(churchConfig.givingCategories[0]);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [donorName, setDonorName] = useState("");

  function loadPaystackScript(): Promise<void> {
    return new Promise((resolve) => {
      if (window.PaystackPop) return resolve();
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  async function handleGive(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !email) return;

    await loadPaystackScript();

    const amountKobo = Math.round(parseFloat(amount) * 100);
    const reference = `give_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Record a pending donation row before opening checkout, so we have
    // a record even if the user closes the popup without paying.
    await supabase.from("donations").insert({
      donor_name: donorName || null,
      donor_email: email,
      category,
      amount: parseFloat(amount),
      paystack_reference: reference,
      status: "pending",
    });

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountKobo,
      ref: reference,
      currency: "NGN",
      metadata: { category, donor_name: donorName },
      callback: function () {
        // Do NOT mark the donation as successful here — this callback
        // can be spoofed. The webhook (server-side) is the source of truth.
        alert(
          "Thank you! Your payment is being confirmed — you'll receive a receipt by email shortly."
        );
      },
      onClose: function () {
        // User closed the popup — the row stays 'pending', harmless.
      },
    });

    handler.openIframe();
  }

  return (
    <form onSubmit={handleGive} className="grid gap-3 max-w-sm">
      <select
        className="border rounded px-3 py-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {churchConfig.givingCategories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        className="border rounded px-3 py-2"
        placeholder="Full name (optional)"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
      />
      <input
        className="border rounded px-3 py-2"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border rounded px-3 py-2"
        placeholder="Amount (₦)"
        type="number"
        min="100"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-amber-600 text-white rounded px-4 py-2 font-medium"
      >
        Give ₦{amount || "0"}
      </button>
    </form>
  );
}
