"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    submissions: 0,
    donations: 0,
    events: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCounts() {
      const [submissionsRes, donationsRes, eventsRes] = await Promise.all([
        supabase
          .from("form_submissions")
          .select("*", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("donations")
          .select("*", { count: "exact", head: true })
          .eq("status", "success"),
        supabase
          .from("content_items")
          .select("*", { count: "exact", head: true })
          .eq("type", "event")
          .eq("status", "published"),
      ]);

      setCounts({
        submissions: submissionsRes.count ?? 0,
        donations: donationsRes.count ?? 0,
        events: eventsRes.count ?? 0,
      });
      setLoading(false);
    }

    loadCounts();
  }, []);

  return (
    <AdminGuard>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="New Submissions" value={counts.submissions} />
            <StatCard label="Successful Donations" value={counts.donations} />
            <StatCard label="Upcoming Events" value={counts.events} />
          </div>
        )}

        <nav className="grid gap-2">
          <Link href="/admin/content" className="underline">
            Manage Content (sermons, events, announcements, testimonies)
          </Link>
          <Link href="/admin/departments" className="underline">
            Manage Departments
          </Link>
          <Link href="/admin/submissions" className="underline">
            View Form Submissions
          </Link>
          <Link href="/admin/donations" className="underline">
            View Donations
          </Link>
        </nav>
      </div>
    </AdminGuard>
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
