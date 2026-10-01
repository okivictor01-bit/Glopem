import Link from "next/link";
import churchConfig from "@/church.config";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={churchConfig.logoPath}
            alt={`${churchConfig.shortName} logo`}
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg">{churchConfig.shortName}</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/sermons">Sermons</Link>
          <Link href="/events">Events</Link>
          <Link href="/departments">Departments</Link>
          <Link href="/give">Give</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
