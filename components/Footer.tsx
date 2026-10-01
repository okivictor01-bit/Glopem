import churchConfig from "@/church.config";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, () => JSX.Element> = {
  facebook: FacebookIcon,
};

const SOCIAL_COLORS: Record<string, string> = {
  facebook: "#1877F2",
};

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

        <div className="flex gap-3 mt-1">
          {Object.entries(churchConfig.socialLinks)
            .filter(([, url]) => url)
            .map(([platform, url]) => {
              const Icon = SOCIAL_ICONS[platform];
              const bg = SOCIAL_COLORS[platform] ?? "#374151";
              return (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: bg }}
                >
                  {Icon ? <Icon /> : <span className="text-xs text-white">{platform[0]}</span>}
                </a>
              );
            })}
        </div>

        <p className="text-white/50 text-xs mt-3">
          © {new Date().getFullYear()} {churchConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
