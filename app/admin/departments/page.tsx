"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminGuard from "@/components/AdminGuard";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminDepartmentsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [contact, setContact] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadDepartments() {
    const { data } = await supabase
      .from("departments")
      .select("*")
      .order("name", { ascending: true });
    setDepartments(data ?? []);
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const slug = slugify(name);
    const { error } = await supabase.from("departments").insert({
      name,
      slug,
      description: description || null,
      leader_name: leaderName || null,
      contact: contact || null,
    });

    if (error) {
      setError(
        error.message.includes("duplicate")
          ? "A department with a similar name already exists."
          : "Something went wrong. Please try again."
      );
      return;
    }

    setName("");
    setDescription("");
    setLeaderName("");
    setContact("");
    loadDepartments();
  }

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    await supabase.from("departments").delete().eq("id", id);
    setDeletingId(null);
    loadDepartments();
  }

  return (
    <AdminGuard>
      <div className="grid gap-8">
        <h1 className="text-2xl font-bold">Manage Departments</h1>

        <form onSubmit={handleSubmit} className="grid gap-3 max-w-md border rounded p-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Department name (e.g. Youth, Choir, Ushering)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Leader's name"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Contact (phone or email)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button className="bg-black text-white rounded px-4 py-2 font-medium">
            Add Department
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div className="grid gap-2">
          {departments.map((d) => (
            <div
              key={d.id}
              className="border rounded p-3 text-sm flex justify-between items-center"
            >
              <span>
                <span className="font-medium">{d.name}</span>
                <span className="text-gray-400 ml-2">/{d.slug}</span>
              </span>
              <button
                onClick={() => handleDelete(d.id, d.name)}
                disabled={deletingId === d.id}
                className="text-red-600 text-xs underline disabled:opacity-50"
              >
                {deletingId === d.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
