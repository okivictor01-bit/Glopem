import Link from "next/link";
import ContentList from "@/components/ContentList";
import churchConfig from "@/church.config";

export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold">{churchConfig.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{churchConfig.tagline}</p>
        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="/contact#new-here"
            className="bg-black text-white px-5 py-2 rounded font-medium"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/give"
            className="bg-amber-600 text-white px-5 py-2 rounded font-medium"
          >
            Give Online
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Service Times</h2>
        <ul className="grid gap-1 text-gray-700">
          {churchConfig.serviceTimes.map((s) => (
            <li key={s.label}>
              {s.label} — <span className="font-medium">{s.time}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-2">{churchConfig.address}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Latest Sermon</h2>
        <ContentList type="sermon" limit={1} />
        <Link href="/sermons" className="text-sm underline">
          View all sermons →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
        <ContentList type="event" limit={3} />
        <Link href="/events" className="text-sm underline">
          View all events →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Announcements</h2>
        <ContentList type="announcement" limit={3} />
      </section>
    </div>
  );
}
