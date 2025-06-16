import React, { useEffect } from "react";
import { aboutMetadata } from "@/utils/aboutMetadata";
import { updatePageMetadata } from "@/utils/metadataUtils";
import AboutHeroSection from "@/components/staticComponents/AboutHeroSection";
import CTASection from "@/components/staticComponents/CTASection";
import MissionVisionSection from "@/components/staticComponents/MissionVisionSection";
import StorySection from "@/components/staticComponents/StorySection";
import TeamSection from "@/components/staticComponents/TeamSection";

const AboutPage = () => {
  // Cập nhật metadata khi component mount
  useEffect(() => {
    updatePageMetadata(aboutMetadata);
  }, []);

  return (
    <main className="min-h-screen">
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
    </main>
  );
};

export default AboutPage;
