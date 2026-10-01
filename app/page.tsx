import Link from "next/link";
import ContentList from "@/components/ContentList";
import churchConfig from "@/church.config";

export default function HomePage() {
  return (
    <div className="grid gap-20">
      {/* HERO */}
      <section className="-mx-4 -mt-8">
        <img
          src="/hero.jpg"
          alt={`${churchConfig.name} — ${churchConfig.heroVerse.text}`}
          className="w-full h-auto"
        />
        <div
          className="px-4 py-8 text-center"
          style={{ backgroundColor: churchConfig.theme.primaryColor }}
        >
          <div className="flex gap-3 justify-center">
            <Link
              href="/contact#new-here"
              className="bg-white text-[var(--ink)] px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/give"
              className="px-6 py-2.5 rounded-full font-medium text-[var(--ink)] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: churchConfig.theme.secondaryColor }}
            >
              Give Online
            </Link>
          </div>
        </div>
      </section>

      {/* FIND YOUR WAY IN — divided list, not boxed cards */}
      <section>
        <h2 className="text-2xl mb-6">Find Your Way In</h2>
        <div className="border-t">
          {[
            { href: "/sermons", title: "Watch or Listen", subtitle: "Latest sermons" },
            { href: "/give", title: "Give Online", subtitle: "Tithes, offerings & more" },
            { href: "/contact", title: "Request Prayer", subtitle: "We'll pray with you" },
            { href: "/events", title: "Upcoming Events", subtitle: "See what's happening" },
            { href: "/contact#new-here", title: "Plan Your Visit", subtitle: "New here? Start here" },
            { href: "/departments", title: "Departments", subtitle: "Find where to serve" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between py-4 border-b group"
            >
              <span className="font-serif text-lg group-hover:opacity-70 transition-opacity">
                {item.title}
              </span>
              <span className="text-sm text-gray-500">{item.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICE TIMES */}
      <section
        className="pl-6 py-2"
        style={{ borderLeft: `3px solid ${churchConfig.theme.secondaryColor}` }}
      >
        <h2 className="text-2xl mb-4">Service Times</h2>
        <ul className="grid gap-2 text-gray-700">
          {churchConfig.serviceTimes.map((s) => (
            <li key={s.label} className="flex justify-between max-w-md">
              <span>{s.label}</span>
              <span className="font-medium">{s.time}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-3">{churchConfig.address}</p>
      </section>

      {/* WORD FOR TODAY — the one bold inverse moment */}
      <section
        className="-mx-4 px-4 py-14 text-center"
        style={{ backgroundColor: churchConfig.theme.primaryColor }}
      >
        <h2
          className="text-3xl mb-4"
          style={{ color: churchConfig.theme.secondaryColor }}
        >
          Word for Today
        </h2>
        <div className="max-w-xl mx-auto text-left [&_h3]:text-white [&_p]:text-white/90 [&_div]:border-white/30">
          <ContentList type="devotional" limit={1} />
        </div>
      </section>

      {/* SERMON SPOTLIGHT */}
      <section>
        <h2 className="text-2xl mb-4">Latest Sermon</h2>
        <ContentList type="sermon" limit={1} />
        <Link href="/sermons" className="text-sm underline mt-2 inline-block">
          View all sermons
        </Link>
      </section>

      {/* EVENTS */}
      <section>
        <h2 className="text-2xl mb-4">Upcoming Events</h2>
        <ContentList type="event" limit={3} />
        <Link href="/events" className="text-sm underline mt-2 inline-block">
          View all events
        </Link>
      </section>

      {/* PASTOR SPOTLIGHT */}
      <section className="flex items-center gap-6 border-t pt-12">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white font-serif text-2xl shrink-0 overflow-hidden"
          style={{ backgroundColor: churchConfig.theme.primaryColor }}
        >
          {churchConfig.pastor.photoPath ? (
            <img
              src={churchConfig.pastor.photoPath}
              alt={churchConfig.pastor.name}
              className="w-24 h-24 object-cover"
            />
          ) : (
            churchConfig.pastor.name
              .split(" ")
              .map((w) => w[0])
              .join("")
          )}
        </div>
        <div>
          <p className="font-serif text-xl">{churchConfig.pastor.name}</p>
          <p
            className="text-sm font-medium"
            style={{ color: churchConfig.theme.secondaryColor }}
          >
            {churchConfig.pastor.title}
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section>
        <h2 className="text-2xl mb-4">Announcements</h2>
        <ContentList type="announcement" limit={3} />
      </section>
    </div>
  );
}
