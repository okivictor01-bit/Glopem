// church.config.ts
// This is the ONE file you edit when reusing this template for a new church.
// Everything here should be referenced by components — nothing church-specific
// should be hardcoded anywhere else in the codebase.

const churchConfig = {
  name: "Glorious Pentecostal Evangelistic Ministry (GLOPEM)",
  shortName: "GLOPEM",
  tagline: "A Place to Belong, A Place to Grow",
  logoPath: "/logo.png",
  address: "Off Elder Komolafe Street, Ijo Mimo, Ijoka Road, Akure, Ondo State",

  serviceTimes: [
    { label: "Tuesday Bible Study", time: "5:00 PM - 7:00 PM" },
    { label: "Thursday Miracle Hour", time: "5:00 PM - 7:00 PM" },
    { label: "1st Sunday — Anointing Service", time: "8:00 AM - 12:00 PM" },
    { label: "2nd Sunday — Miracle Sunday", time: "8:00 AM - 12:00 PM" },
    { label: "3rd Sunday — Praise Sunday", time: "8:00 AM - 12:00 PM" },
    { label: "4th Sunday — Power Sunday", time: "8:00 AM - 12:00 PM" },
  ],

  whatsappNumber: "2348035607949",

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

  // Hero section scripture — shown large on the homepage banner.
  heroVerse: {
    text: "Jesus Christ the same yesterday, and today, and forever.",
    reference: "Hebrews 13:8",
  },

  // Leadership spotlight — placeholder until a name/photo is provided.
  pastor: {
    name: "Pastor's Name",
    title: "Senior Pastor",
    photoPath: "", // add a photo path (e.g. /pastor.jpg) once available
  },

  theme: {
    primaryColor: "#1E3A8A",
    secondaryColor: "#FACC15",
  },
};

export default churchConfig;
