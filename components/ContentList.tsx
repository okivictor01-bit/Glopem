"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ContentType = "sermon" | "event" | "announcement" | "testimony" | "devotional";

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string | null;
  media_url: string | null;
  event_date: string | null;
  location: string | null;
  speaker: string | null;
  created_at: string;
}

export default function ContentList({
  type,
  limit = 10,
}: {
  type: ContentType;
  limit?: number;
}) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchItems() {
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("type", type)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (isMounted) {
        if (!error && data) setItems(data as ContentItem[]);
        setLoading(false);
      }
    }

    fetchItems();
    return () => {
      isMounted = false;
    };
  }, [type, limit]);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (items.length === 0)
    return <p className="text-sm text-gray-500">Nothing here yet.</p>;

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          {item.speaker && (
            <p className="text-sm text-gray-500">Speaker: {item.speaker}</p>
          )}
          {item.event_date && (
            <p className="text-sm text-gray-500">
              {new Date(item.event_date).toLocaleString()}
            </p>
          )}
          {item.location && (
            <p className="text-sm text-gray-500">Location: {item.location}</p>
          )}
          {item.description && (
            <p className="mt-2 text-gray-700">{item.description}</p>
          )}
          {item.media_url && (
            <a
              href={item.media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm font-medium underline"
            >
              {type === "sermon" ? "Watch / Listen →" : "Learn more →"}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
