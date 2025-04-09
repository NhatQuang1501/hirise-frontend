import React, { useEffect } from "react";
import AboutHeroSection from "@/components/staticComponents/AboutHeroSection";
import CTASection from "@/components/staticComponents/CTASection";
import MissionVisionSection from "@/components/staticComponents/MissionVisionSection";
import StorySection from "@/components/staticComponents/StorySection";
import TeamSection from "@/components/staticComponents/TeamSection";
import { aboutMetadata } from "./aboutMetadata";

const AboutPage = () => {
  useEffect(() => {
    // Update metadata
    document.title = aboutMetadata.title;
    updateMetaTags();
  }, []);

  const updateMetaTags = () => {
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", aboutMetadata.description);
    }

    // Update OG tags
    updateOGTag("title", aboutMetadata.openGraph.title);
    updateOGTag("description", aboutMetadata.openGraph.description);
    updateOGTag("image", aboutMetadata.openGraph.image);
    updateOGTag("url", aboutMetadata.openGraph.url);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", aboutMetadata.canonical);
  };

  const updateOGTag = (property: string, content: string) => {
    const tag = document.querySelector(`meta[property="og:${property}"]`);
    if (tag) {
      tag.setAttribute("content", content);
    }
  };

  return (
    <div className="min-h-screen">
      <AboutHeroSection />
      <StorySection />
      <MissionVisionSection />
      <TeamSection />
      <CTASection
        title="Join Our Journey"
        description="Be part of our mission to transform tech recruitment"
        primaryAction={{
          text: "View Open Jobs",
          href: "/jobs",
        }}
        secondaryAction={{
          text: "Contact Us",
          href: "/contact",
        }}
      />
    </div>
  );
};

export default AboutPage;
