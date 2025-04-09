import React, { useEffect } from "react";
import ContactForm from "@/components/staticComponents/ContactForm";
import ContactInfo from "@/components/staticComponents/ContactInfo";
import MapEmbed from "@/components/staticComponents/MapEmbed";
import { contactMetadata } from "./contactMetadata";
import { updatePageMetadata } from "./metadataUtils";

const ContactPage = () => {
  // Cập nhật metadata khi component mount
  useEffect(() => {
    updatePageMetadata(contactMetadata);
  }, []);

  return (
    <main className="bg-background min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Contact HiRise</h1>
          <p className="text-muted-foreground text-lg">
            Have questions or need assistance? We're here to help! Get in touch with our team.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info & Form */}
          <div className="space-y-8">
            <ContactInfo />
            <ContactForm />
          </div>

          {/* Map */}
          <div className="order-first md:order-last">
            <MapEmbed />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
