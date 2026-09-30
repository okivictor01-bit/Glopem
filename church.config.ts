// church.config.ts
// This is the ONE file you edit when reusing this template for a new church.
// Everything here should be referenced by components — nothing church-specific
// should be hardcoded anywhere else in the codebase.

const churchConfig = {
  name: "Glorious Pentecostal Evangelistic Ministry (GLOPEM)",
  shortName: "GLOPEM",
  tagline: "A Place to Belong, A Place to Grow", // update with GLOPEM's actual motto if there is one
  logoPath: "/logo.png",
  address: "Off Elder Komolafe Street, Ijo Mimo, Ijoka Road, Akure, Ondo State",

  // Sunday services rotate by week of the month, so each is listed separately
  // rather than as a single repeating "Sunday service" entry.
  serviceTimes: [
    { label: "Tuesday Bible Study", time: "5:00 PM - 7:00 PM" },
    { label: "Thursday Miracle Hour", time: "5:00 PM - 7:00 PM" },
    { label: "1st Sunday — Anointing Service", time: "8:00 AM - 12:00 PM" },
    { label: "2nd Sunday — Miracle Sunday", time: "8:00 AM - 12:00 PM" },
    { label: "3rd Sunday — Praise Sunday", time: "8:00 AM - 12:00 PM" },
    { label: "4th Sunday — Power Sunday", time: "8:00 AM - 12:00 PM" },
  ],

  whatsappNumber: "2348035607949", // converted from 08035607949 to international format

  socialLinks: {
    facebook: "https://www.facebook.com/glopem.church",
    instagram: "",
    youtube: "",
    tiktok: "",
  },

  givingCategories: [
    "Tithe",
    "Offering",
    "Seed",
    "Building Project",
    "Missions",
    "Thanksgiving",
  ],

  theme: {
    primaryColor: "#1E3A8A", // blue, from the logo's globe
    secondaryColor: "#FACC15", // yellow, from the "GLOPEM" text
  },
};

export default churchConfig;
