import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Get In Touch
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Fill out the form below and we will get back to you within 24 hours.
      </p>
      
      {/* This renders the component you already created */}
      <ContactForm />
    </div>
  );
}