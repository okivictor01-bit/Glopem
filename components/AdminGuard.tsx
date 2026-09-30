"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      const hasSession = !!data.session;
      setAuthed(hasSession);
      setChecking(false);

      if (!hasSession) {
        router.push("/admin/login");
      }
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      if (!session) {
        router.push("/admin/login");
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checking) {
    return <p className="text-gray-500">Checking access…</p>;
  }

  if (!authed) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <Link href="/admin" className="font-semibold">
          Admin
        </Link>
        <button onClick={handleLogout} className="text-sm underline text-gray-600">
          Log out
        </button>
      </div>
      {children}
    </div>
  );
}
