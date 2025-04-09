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
    name: "John Doe",
    role: "Founder & CEO",
    image: "/team/john-doe.jpg",
    bio: "10+ years in tech recruitment and startup leadership",
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  // Add more team members
];

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <p className="text-muted-foreground mb-12">
            The passionate individuals driving innovation in tech recruitment
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto mb-4 aspect-square w-32 rounded-full object-cover"
              />
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
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
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
