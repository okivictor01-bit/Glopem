"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("departments")
        .select("*")
        .order("name", { ascending: true });
      setDepartments(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : departments.length === 0 ? (
        <p className="text-gray-500">No departments listed yet.</p>
      ) : (
        <div className="grid gap-3">
          {departments.map((d) => (
            <Link
              key={d.id}
              href={`/departments/${d.slug}`}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow block"
            >
              <p className="font-semibold">{d.name}</p>
              {d.description && (
                <p className="text-sm text-gray-500 mt-1">{d.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
