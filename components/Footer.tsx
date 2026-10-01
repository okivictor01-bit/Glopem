import churchConfig from "@/church.config";

export default function Footer() {
  return (
    <footer
      className="mt-20 py-10 text-sm"
      style={{ backgroundColor: churchConfig.theme.primaryColor }}
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-3 text-white/80">
        <img
          src={churchConfig.logoPath}
          alt={`${churchConfig.shortName} logo`}
          className="h-12 w-auto"
        />
        <p className="font-serif text-white text-base">{churchConfig.name}</p>
        <p>{churchConfig.address}</p>
        <div className="flex gap-3">
          {Object.entries(churchConfig.socialLinks)
            .filter(([, url]) => url)
            .map(([platform, url]) => (
              <a
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {platform}
              </a>
            ))}
        </div>
        <p className="text-white/50 text-xs mt-2">
          © {new Date().getFullYear()} {churchConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
