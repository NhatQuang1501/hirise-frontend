import { Compass, Target } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <section className="bg-secondary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Target className="text-primary size-6" />
              </div>
              <h3 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-2xl font-bold text-transparent">Our Mission</h3>
            </div>
            <p className="text-muted-foreground">
              To create the most efficient and transparent tech recruitment platform in Vietnam,
              connecting talented professionals with opportunities that matter while helping
              companies build strong tech teams.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Compass className="text-primary size-6" />
              </div>
              <h3 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-2xl font-bold text-transparent">Our Vision</h3>
            </div>
            <p className="text-muted-foreground">
              To be the catalyst for Vietnam's tech industry growth, fostering a thriving ecosystem
              where innovation meets opportunity, and where every tech professional can build a
              meaningful career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
