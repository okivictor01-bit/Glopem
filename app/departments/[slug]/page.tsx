import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

// Cloudflare Pages requires dynamic routes to run on the Edge Runtime.
export const runtime = "edge";

export default async function DepartmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: department } = await supabase
    .from("departments")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!department) return notFound();

  return (
    <div className="max-w-2xl grid gap-4">
      <h1 className="text-2xl font-bold">{department.name}</h1>
      {department.description && (
        <p className="text-gray-700">{department.description}</p>
      )}
      {department.leader_name && (
        <p className="text-sm text-gray-500">Leader: {department.leader_name}</p>
      )}
      {department.contact && (
        <p className="text-sm text-gray-500">Contact: {department.contact}</p>
      )}
    </div>
  );
}
