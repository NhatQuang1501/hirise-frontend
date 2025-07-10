import { Github, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Quang Nguyen",
    role: "Founder & CEO",
    image: "/team/quang-nguyen.jpg",
    bio: "10+ years in tech recruitment and startup leadership",
    social: {
      linkedin: "https://linkedin.com/in/quang-nguyen-123",
      github: "https://github.com/quang-nguyen-123",
    },
  },
  // Add more team members
];

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="from-primary mb-4 bg-gradient-to-r to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground mb-12">
            The passionate individuals driving innovation in tech recruitment
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="from-primary/20 mb-4 overflow-hidden rounded-full bg-gradient-to-r to-blue-600/20 p-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-square w-32 rounded-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                <p className="text-primary mb-2 text-sm">{member.role}</p>
                <p className="text-muted-foreground mb-4 text-sm">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
