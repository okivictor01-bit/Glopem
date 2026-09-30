import churchConfig from "@/church.config";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-3">
        <img
          src={churchConfig.logoPath}
          alt={`${churchConfig.shortName} logo`}
          className="h-12 w-auto"
        />
        <p>
          {churchConfig.name} — {churchConfig.address}
        </p>
        <div className="flex gap-3">
          {Object.entries(churchConfig.socialLinks)
            .filter(([, url]) => url)
            .map(([platform, url]) => (
              <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer">
                {platform}
              </a>
            ))}
        </div>
        <p>© {new Date().getFullYear()} {churchConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
