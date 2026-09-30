"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminGuard from "@/components/AdminGuard";

type ContentType = "sermon" | "event" | "announcement" | "testimony";

export default function AdminContentPage() {
  const [type, setType] = useState<ContentType>("sermon");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [items, setItems] = useState<any[]>([]);

  async function loadItems() {
    const { data } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("content_items").insert({
      type,
      title,
      description,
      media_url: mediaUrl || null,
      event_date: eventDate || null,
      location: location || null,
      speaker: speaker || null,
      status: "published",
    });
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setEventDate("");
    setLocation("");
    setSpeaker("");
    loadItems();
  }

  return (
    <AdminGuard>
    <div className="grid gap-8">
      <h1 className="text-2xl font-bold">Manage Content</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-md border rounded p-4">
        <select
          className="border rounded px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as ContentType)}
        >
          <option value="sermon">Sermon</option>
          <option value="event">Event</option>
          <option value="announcement">Announcement</option>
          <option value="testimony">Testimony</option>
        </select>
        <input
          className="border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="Media URL (YouTube link, audio, image)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        {type === "sermon" && (
          <input
            className="border rounded px-3 py-2"
            placeholder="Speaker"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
          />
        )}
        {type === "event" && (
          <>
            <input
              className="border rounded px-3 py-2"
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </>
        )}
        <button className="bg-black text-white rounded px-4 py-2 font-medium">
          Publish
        </button>
      </form>

      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item.id} className="border rounded p-3 text-sm flex justify-between">
            <span>
              <span className="text-xs uppercase text-gray-400 mr-2">{item.type}</span>
              {item.title}
            </span>
            <span className="text-gray-400">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
    </AdminGuard>
  );
}
