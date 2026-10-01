import "./globals.css";
import { Fraunces, Work_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import churchConfig from "@/church.config";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});

export const metadata = {
  title: churchConfig.name,
  description: churchConfig.tagline,
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
