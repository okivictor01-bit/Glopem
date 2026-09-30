import GenericForm from "@/components/GenericForm";

export default function ContactPage() {
  return (
    <div className="grid gap-12">
      <div id="new-here">
        <GenericForm formType="visitor_registration" />
      </div>
      <div>
        <GenericForm formType="prayer_request" />
      </div>
      <div>
        <GenericForm formType="counselling" />
      </div>
    </div>
  );
}
