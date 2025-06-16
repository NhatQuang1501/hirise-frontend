import { cn } from "@/lib/utils";

const StorySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Founded in 2024, HiRise emerged from a simple observation: the disconnect between
                talented tech professionals and great opportunities in Vietnam's rapidly growing
                tech sector.
              </p>
              <p>
                What started as a small team of passionate recruiters and developers has grown into
                a comprehensive platform that's revolutionizing how tech hiring happens in Vietnam.
              </p>
              <p>
                Our values of transparency, innovation, and community drive everything we do. We
                believe in creating an ecosystem where both talent and companies can thrive.
              </p>
            </div>
          </div>
          <div className={cn("grid grid-cols-2 gap-4", "md:gap-6 lg:gap-8")}>
            <img
              src="/images/about/team-1.jpg"
              alt="HiRise team collaboration"
              className="rounded-lg object-cover"
            />
            <img
              src="/images/about/team-2.jpg"
              alt="HiRise office culture"
              className="mt-8 rounded-lg object-cover"
            />
            <img
              src="/images/about/team-3.jpg"
              alt="HiRise community event"
              className="rounded-lg object-cover"
            />
            <img
              src="/images/about/team-4.jpg"
              alt="HiRise development team"
              className="-mt-8 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
