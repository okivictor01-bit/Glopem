import churchConfig from "@/church.config";

export default function AboutPage() {
  return (
    <div className="grid gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold">About {churchConfig.name}</h1>
      <p className="text-gray-700">
        Replace this paragraph with your church's history, vision, and
        mission statement. Keep it warm and personal — this is often the
        second page a new visitor reads after the homepage.
      </p>
      <div>
        <h2 className="font-semibold text-lg">Statement of Faith</h2>
        <p className="text-gray-700">
          Add your church's core doctrinal beliefs here.
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Leadership</h2>
        <p className="text-gray-700">
          Add a short bio and photo of the senior pastor and key leaders here.
        </p>
      </div>
    </div>
  );
}
