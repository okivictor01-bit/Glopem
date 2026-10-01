import Link from "next/link";
import ContentList from "@/components/ContentList";
import churchConfig from "@/church.config";

export default function HomePage() {
  return (
    <div className="grid gap-16">
      {/* HERO */}
      <section
        className="-mx-4 -mt-8 px-4 py-16 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${churchConfig.theme.primaryColor}, #0f1f4d)`,
        }}
      >
        <p className="italic text-lg max-w-xl mx-auto">
          “{churchConfig.heroVerse.text}”
        </p>
        <p className="text-sm text-white/70 mt-1">— {churchConfig.heroVerse.reference}</p>

        <h1 className="text-4xl font-bold mt-6">{churchConfig.name}</h1>
        <p className="text-lg text-white/80 mt-2">{churchConfig.tagline}</p>

        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="/contact#new-here"
            className="bg-white text-black px-5 py-2 rounded font-medium"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/give"
            className="px-5 py-2 rounded font-medium text-black"
            style={{ backgroundColor: churchConfig.theme.secondaryColor }}
          >
            Give Online
          </Link>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <QuickCard href="/sermons" title="Watch / Listen" subtitle="Latest sermons" />
          <QuickCard href="/give" title="Online Giving" subtitle="Tithes, offerings & more" />
          <QuickCard href="/contact" title="Prayer Request" subtitle="We'll pray with you" />
          <QuickCard href="/events" title="Upcoming Events" subtitle="See what's happening" />
          <QuickCard href="/contact#new-here" title="New Here?" subtitle="Plan your first visit" />
          <QuickCard href="/departments" title="Departments" subtitle="Find where to serve" />
          <QuickCard href="/about" title="About GLOPEM" subtitle="Our story & beliefs" />
        </div>
      </section>

      {/* SERVICE TIMES */}
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

      {/* DEVOTIONAL BLOCK */}
      <section
        className="rounded-lg p-6"
        style={{ backgroundColor: `${churchConfig.theme.secondaryColor}20` }}
      >
        <h2 className="text-xl font-semibold mb-2">Word for Today</h2>
        <ContentList type="devotional" limit={1} />
      </section>

      {/* SERMON SPOTLIGHT */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Latest Sermon</h2>
        <ContentList type="sermon" limit={1} />
        <Link href="/sermons" className="text-sm underline">
          View all sermons →
        </Link>
      </section>

      {/* EVENTS */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
        <ContentList type="event" limit={3} />
        <Link href="/events" className="text-sm underline">
          View all events →
        </Link>
      </section>

      {/* PASTOR SPOTLIGHT */}
      <section className="flex items-center gap-6 border-t pt-10">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
          style={{ backgroundColor: churchConfig.theme.primaryColor }}
        >
          {churchConfig.pastor.photoPath ? (
            <img
              src={churchConfig.pastor.photoPath}
              alt={churchConfig.pastor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            churchConfig.pastor.name
              .split(" ")
              .map((w) => w[0])
              .join("")
          )}
        </div>
        <div>
          <p className="font-semibold text-lg">{churchConfig.pastor.name}</p>
          <p className="text-gray-500">{churchConfig.pastor.title}</p>
        </div>
      </section>

      {/* ANNOUNCEMENTS / NEWS GRID */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Announcements</h2>
        <ContentList type="announcement" limit={3} />
      </section>
    </div>
  );
}

function QuickCard({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </Link>
  );
}
