import { useEffect } from "react";
import { contactMetadata } from "@/utils/contactMetadata";
import { updatePageMetadata } from "@/utils/metadataUtils";
import ContactForm from "@/components/staticComponents/ContactForm";
import ContactInfo from "@/components/staticComponents/ContactInfo";
import MapEmbed from "@/components/staticComponents/MapEmbed";
import { ArrowRight } from "lucide-react";

const ContactPage = () => {
  // Update metadata when component mounts
  useEffect(() => {
    updatePageMetadata(contactMetadata);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16 animate-fade-in">
          <div className="mb-6 inline-block rounded-full bg-primary/10 p-3">
            <ArrowRight className="text-primary size-6" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Contact HiRise
          </h1>
          <p className="text-muted-foreground text-lg">
            Have questions or need assistance? We're here to help! Get in touch with our team.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info & Form */}
          <div className="space-y-8 animate-fade-in">
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <ContactInfo />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <ContactForm />
            </div>
          </div>

          {/* Map */}
          <div className="order-first md:order-last animate-fade-in">
            <div className="overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 to-blue-600/20 p-1">
              <div className="rounded-lg bg-white">
                <MapEmbed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
