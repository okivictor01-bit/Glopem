import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function DonationsPage() {
  const { data: donations } = await supabaseAdmin
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donations</h1>
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
          {(donations ?? []).map((d) => (
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
    </div>
  );
}
