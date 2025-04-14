import React from "react";
import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";
import SearchBox from "../search/SearchBox";

const HeroSection: React.FC = () => {
  return (
    <section className="from-primary/10 to-secondary/10 bg-gradient-to-r py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Find your dream <span className="text-primary">IT job</span>
            </h1>
            <p className="mb-6 text-lg text-gray-600 md:text-xl">
              Connect you with thousands of jobs from top technology companies.
            </p>

            <SearchBox />

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <p>Popular:</p>
              <div className="flex flex-wrap gap-2">
                <Link to={ROUTES.PUBLIC.JOBS.SEARCH("react")} className="hover:text-primary">
                  ReactJS
                </Link>
                ,
                <Link to={ROUTES.PUBLIC.JOBS.SEARCH("java")} className="hover:text-primary">
                  Java
                </Link>
                ,
                <Link to={ROUTES.PUBLIC.JOBS.SEARCH("python")} className="hover:text-primary">
                  Python
                </Link>
                ,
                <Link to={ROUTES.PUBLIC.JOBS.SEARCH("devops")} className="hover:text-primary">
                  DevOps
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center">
            <img
              src="/hero-image.svg"
              alt="IT Jobs Illustration"
              className="max-w-md"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
