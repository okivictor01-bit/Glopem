import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Link from "next/link";

export default async function AdminDashboard() {
  const [{ count: submissionsCount }, { count: donationsCount }, { count: eventsCount }] =
    await Promise.all([
      supabaseAdmin
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabaseAdmin
        .from("donations")
        .select("*", { count: "exact", head: true })
        .eq("status", "success"),
      supabaseAdmin
        .from("content_items")
        .select("*", { count: "exact", head: true })
        .eq("type", "event")
        .eq("status", "published"),
    ]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="New Submissions" value={submissionsCount ?? 0} />
        <StatCard label="Successful Donations" value={donationsCount ?? 0} />
        <StatCard label="Upcoming Events" value={eventsCount ?? 0} />
      </div>

      <nav className="grid gap-2">
        <Link href="/admin/content" className="underline">
          Manage Content (sermons, events, announcements, testimonies)
        </Link>
        <Link href="/admin/submissions" className="underline">
          View Form Submissions
        </Link>
        <Link href="/admin/donations" className="underline">
          View Donations
        </Link>
      </nav>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
