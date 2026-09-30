"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminGuard from "@/components/AdminGuard";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      setSubmissions(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <div className="grid gap-3">
            {submissions.length === 0 && (
              <p className="text-gray-500">No submissions yet.</p>
            )}
            {submissions.map((s) => (
              <div key={s.id} className="border rounded p-4">
                <p className="text-xs uppercase text-gray-400">{s.form_type}</p>
                <p className="font-medium">
                  {s.is_anonymous ? "Anonymous" : s.full_name ?? "—"}
                </p>
                {!s.is_anonymous && (
                  <p className="text-sm text-gray-500">
                    {s.phone} {s.email && `· ${s.email}`}
                  </p>
                )}
                <p className="mt-2">{s.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(s.created_at).toLocaleString()} · {s.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
