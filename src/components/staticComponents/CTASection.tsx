import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTAAction {
  text: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
}

const CTASection = ({ title, description, primaryAction, secondaryAction }: CTASectionProps) => {
  return (
    <section className="border-t bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{description}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to={primaryAction.href}>
              <Button size="lg" className="gap-2">
                {primaryAction.text}
                <ArrowRight className="size-5" />
              </Button>
            </Link>
            {secondaryAction && (
              <Link to={secondaryAction.href}>
                <Button variant="outline" size="lg">
                  {secondaryAction.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
