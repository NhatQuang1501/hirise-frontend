import React, { useEffect } from "react";
import ContactForm from "@/components/staticComponents/ContactForm";
import ContactInfo from "@/components/staticComponents/ContactInfo";
import MapEmbed from "@/components/staticComponents/MapEmbed";
import { contactMetadata } from "./contactMetadata";

const ContactPage = () => {
  useEffect(() => {
    // Update metadata
    document.title = contactMetadata.title;
    updateMetaTags();
  }, []);

  const updateMetaTags = () => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", contactMetadata.description);
    }

    updateOGTag("title", contactMetadata.openGraph.title);
    updateOGTag("description", contactMetadata.openGraph.description);
    updateOGTag("image", contactMetadata.openGraph.image);
    updateOGTag("url", contactMetadata.openGraph.url);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", contactMetadata.canonical);
  };

  const updateOGTag = (property: string, content: string) => {
    const tag = document.querySelector(`meta[property="og:${property}"]`);
    if (tag) {
      tag.setAttribute("content", content);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Contact HiRise</h1>
          <p className="text-muted-foreground text-lg">
            Have questions or need assistance? We're here to help! Get in touch with our team.
          </p>
        </div>

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
    </div>
  );
};

export default ContactPage;
