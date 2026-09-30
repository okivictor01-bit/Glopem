"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type FormType = "prayer_request" | "visitor_registration" | "counselling";

const FORM_LABELS: Record<FormType, string> = {
  prayer_request: "Submit a Prayer Request",
  visitor_registration: "I'm New Here",
  counselling: "Request Counselling",
};

export default function GenericForm({ formType }: { formType: FormType }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const { error } = await supabase.from("form_submissions").insert({
      form_type: formType,
      full_name: isAnonymous ? null : fullName,
      phone: isAnonymous ? null : phone,
      email: isAnonymous ? null : email,
      message,
      is_anonymous: isAnonymous,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("done");
    setFullName("");
    setPhone("");
    setEmail("");
    setMessage("");
  }

  if (status === "done") {
    return (
      <p className="text-green-700 font-medium">
        Thank you — we've received your submission.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 max-w-md">
      <h2 className="text-xl font-semibold">{FORM_LABELS[formType]}</h2>

      {formType === "prayer_request" && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Submit anonymously
        </label>
      )}

      {!isAnonymous && (
        <>
          <input
            className="border rounded px-3 py-2"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}

      <textarea
        className="border rounded px-3 py-2"
        placeholder="Your message"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-black text-white rounded px-4 py-2 font-medium disabled:opacity-50"
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
