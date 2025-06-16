import React from "react";
import { Award, Briefcase, Clock, Globe, ShieldCheck, Users } from "lucide-react";

const benefits = [
  {
    icon: <Briefcase className="text-primary h-6 w-6" />,
    title: "Quality Jobs",
    description: "Access thousands of job opportunities from top companies",
  },
  {
    icon: <ShieldCheck className="text-primary h-6 w-6" />,
    title: "Verified Companies",
    description: "All companies are verified and thoroughly vetted",
  },
  {
    icon: <Clock className="text-primary h-6 w-6" />,
    title: "Time-Saving",
    description: "Search and apply quickly with a streamlined process",
  },
  {
    icon: <Award className="text-primary h-6 w-6" />,
    title: "Skills Analysis",
    description: "Get assessments of your fit for the job",
  },
  {
    icon: <Globe className="text-primary h-6 w-6" />,
    title: "Global Opportunities",
    description: "Discover remote and international work opportunities",
  },
  {
    icon: <Users className="text-primary h-6 w-6" />,
    title: "Professional Network",
    description: "Connect with industry professionals and expand your network",
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Why Choose <span className="text-primary">HiRise</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We provide a modern job search platform that connects talented candidates with leading
            companies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="bg-primary/10 mb-4 inline-block rounded-full p-3">{benefit.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
