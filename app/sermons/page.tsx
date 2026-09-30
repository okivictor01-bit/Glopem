import ContentList from "@/components/ContentList";

export default function SermonsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sermons</h1>
      <ContentList type="sermon" limit={50} />
    </div>
  );
}
