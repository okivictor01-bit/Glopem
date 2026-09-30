import GiveButton from "@/components/GiveButton";
import churchConfig from "@/church.config";

export default function GivePage() {
  return (
    <div className="grid gap-6 max-w-md">
      <h1 className="text-2xl font-bold">Give Online</h1>
      <p className="text-gray-600">
        Your giving supports the ministry and outreach of {churchConfig.name}.
        Payments are processed securely via Paystack.
      </p>
      <GiveButton />
      <div className="text-sm text-gray-500 border-t pt-4">
        <p className="font-medium">Prefer bank transfer?</p>
        <p>Contact us via WhatsApp for our account details.</p>
      </div>
    </div>
  );
}
