import ContentList from "@/components/ContentList";

export default function EventsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ContentList type="event" limit={50} />
    </div>
  );
}
