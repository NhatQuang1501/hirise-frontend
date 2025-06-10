import React from "react";
import { ROUTES } from "@/routes/routes";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: ROUTES.PUBLIC.JOBS.LIST,
      search: `?search=${encodeURIComponent(searchTerm)}`,
    });
  };

  const handleTrendingSearch = (term: string) => {
    navigate({
      pathname: ROUTES.PUBLIC.JOBS.LIST,
      search: `?search=${encodeURIComponent(term)}`,
    });
  };

  // Trending keywords - có thể lấy từ API trong tương lai
  const trendingKeywords = ["React", "Java", "Python", "Product Manager", "UI/UX Designer"];

  return (
    <section className="from-secondary to-primary relative bg-gradient-to-r py-24 text-white">
      {/* Abstract shapes decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="bg-primary-foreground absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl"></div>
        <div className="bg-primary-foreground absolute top-40 right-10 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-secondary-foreground absolute bottom-10 left-1/3 h-80 w-80 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-white/30 bg-white/10 px-4 py-1 text-white"
          >
            <Sparkles className="mr-1 size-4" /> The Future of Tech Recruitment
          </Badge>

          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Find Your Dream <span className="text-primary-foreground">Tech Career</span>
          </h1>
          <p className="text-primary-foreground mb-10 text-lg">
            Discover thousands of job opportunities from top companies in the technology industry
          </p>

          {/* Search form - styled similar to CompanyListPage */}
          <form onSubmit={handleSearch} className="mx-auto max-w-xl">
            <div className="bg-card flex flex-col gap-2 rounded-xl p-2 shadow-lg sm:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-foreground border-0 pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                className="from-primary to-secondary w-full bg-gradient-to-r text-white hover:opacity-90 sm:w-auto"
              >
                Search Jobs
              </Button>
            </div>
          </form>

          {/* Trending searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-white/70">Trending:</span>
            {trendingKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleTrendingSearch(keyword)}
                className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
