import { ROUTES } from "@/routes/routes";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <section className="from-primary/10 to-secondary/5 relative overflow-hidden bg-gradient-to-r py-24 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="bg-primary/5 absolute -top-20 -left-20 h-64 w-64 rounded-full"></div>
        <div className="bg-secondary/5 absolute -right-20 -bottom-32 h-96 w-96 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-primary/10 mb-6 inline-block rounded-full p-3">
            <ArrowRight className="text-primary size-6" />
          </div>
          <h1 className="from-primary mb-6 bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Transforming Tech Recruitment in Vietnam
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            We're building the bridge between talented tech professionals and innovative companies,
            creating meaningful careers and driving industry growth.
          </p>
          <Link to={ROUTES.PUBLIC.JOBS.LIST}>
            <Button
              size="lg"
              className="from-primary gap-2 bg-gradient-to-r to-blue-600 transition-all hover:shadow-md"
            >
              View Open Roles
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
