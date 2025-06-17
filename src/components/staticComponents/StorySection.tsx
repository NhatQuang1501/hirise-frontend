import { cn } from "@/lib/utils";

const StorySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Our Story
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p className="text-lg">
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
            <div className="overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 p-1 shadow-lg transition-all hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)] bg-white">
                <img
                  src="/images/about/team-1.jpg"
                  alt="HiRise team collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="mt-8 overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 p-1 shadow-lg transition-all hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)] bg-white">
                <img
                  src="/images/about/team-2.jpg"
                  alt="HiRise office culture"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 p-1 shadow-lg transition-all hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)] bg-white">
                <img
                  src="/images/about/team-3.jpg"
                  alt="HiRise community event"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="-mt-8 overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 p-1 shadow-lg transition-all hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)] bg-white">
                <img
                  src="/images/about/team-4.jpg"
                  alt="HiRise development team"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
