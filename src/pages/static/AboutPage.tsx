import { useEffect } from "react";
import { aboutMetadata } from "@/utils/aboutMetadata";
import { updatePageMetadata } from "@/utils/metadataUtils";
import AboutHeroSection from "@/components/staticComponents/AboutHeroSection";
import CTASection from "@/components/staticComponents/CTASection";
import MissionVisionSection from "@/components/staticComponents/MissionVisionSection";
import StorySection from "@/components/staticComponents/StorySection";
import TeamSection from "@/components/staticComponents/TeamSection";

const AboutPage = () => {
  // Update metadata when component mounts
  useEffect(() => {
    updatePageMetadata(aboutMetadata);
  }, []);

  return (
    <main className="from-background to-secondary/5 min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <AboutHeroSection />

      {/* Story Section */}
      <div className="animate-fade-in">
        <StorySection />
      </div>

      {/* Mission & Vision Section */}
      <div className="animate-fade-in">
        <MissionVisionSection />
      </div>

      {/* Team Section */}
      <div className="animate-fade-in">
        <TeamSection />
      </div>

      {/* CTA Section */}
      <div className="animate-fade-in">
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
    </main>
  );
};

export default AboutPage;
