import churchConfig from "@/church.config";

export default function WhatsAppButton() {
  const url = `https://wa.me/${churchConfig.whatsappNumber}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-600 text-white rounded-full px-4 py-3 shadow-lg font-medium z-50"
    >
      Chat on WhatsApp
    </a>
  );
}
