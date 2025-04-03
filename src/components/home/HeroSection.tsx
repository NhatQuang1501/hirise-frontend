import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const HeroSection: React.FC = () => {
  return (
    <section className="from-primary/10 to-secondary/10 bg-gradient-to-r py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Tìm kiếm công việc <span className="text-primary">IT mơ ước</span> của bạn
            </h1>
            <p className="mb-6 text-lg text-gray-600 md:text-xl">
              Kết nối bạn với hàng nghìn công việc từ những công ty công nghệ hàng đầu.
            </p>

            <SearchBox />

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <p>Phổ biến:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/jobs?q=react" className="hover:text-primary">
                  ReactJS
                </Link>
                ,
                <Link to="/jobs?q=java" className="hover:text-primary">
                  Java
                </Link>
                ,
                <Link to="/jobs?q=python" className="hover:text-primary">
                  Python
                </Link>
                ,
                <Link to="/jobs?q=devops" className="hover:text-primary">
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
