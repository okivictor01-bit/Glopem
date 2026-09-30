"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });
      setDonations(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donations</h1>
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Date</th>
              <th>Donor</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="py-2">{new Date(d.created_at).toLocaleDateString()}</td>
                <td>{d.donor_name ?? "—"}</td>
                <td>{d.category}</td>
                <td>₦{Number(d.amount).toLocaleString()}</td>
                <td>{d.status}</td>
                <td className="text-xs text-gray-400">{d.paystack_reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
