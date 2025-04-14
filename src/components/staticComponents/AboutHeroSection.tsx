import { ROUTES } from "@/routes/routes";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <section className="from-primary/10 to-secondary/5 relative bg-gradient-to-r py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Transforming Tech Recruitment in Vietnam
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            We're building the bridge between talented tech professionals and innovative companies,
            creating meaningful careers and driving industry growth.
          </p>
          <Link to={ROUTES.PUBLIC.JOBS.LIST}>
            <Button size="lg" className="gap-2">
              View Open Roles
              <ArrowRight className="size5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
