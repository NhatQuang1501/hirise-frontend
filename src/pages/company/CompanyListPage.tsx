import React, { useEffect, useState } from "react";
import { companiesMetadata } from "@/utils/companyMetadata";
import { Building2, Filter, Rocket, Search, Sparkles, TrendingUp, Users, X } from "lucide-react";
import { useCompanyPagination } from "@/hooks/useCompanyPagination";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import NewJobsCompanyGrid from "@/components/company/NewJobsCompanyGrid";
import PopularCompaniesCarousel from "@/components/company/PopularCompaniesCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Industry {
  id: string;
  name: string;
}

interface Location {
  id: string;
  address: string;
  country: string;
}

const CompanyListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { companies: topCompanies, loading: topCompaniesLoading } = useCompanyPagination({
    initialFilters: {
      page_size: 5,
      ordering: "-follower_count",
    },
  });

  // Update metadata when component mounts
  useEffect(() => {
    document.title = companiesMetadata.title;

    // Instead of fetching from API endpoints that don't exist yet,
    // we'll use static data for now
    setIndustries([
      { id: "tech", name: "Technology" },
      { id: "finance", name: "Fintech" },
      { id: "ecommerce", name: "E-commerce" },
      { id: "healthcare", name: "Healthcare Tech" },
      { id: "edu", name: "Education Tech" },
    ]);

    setLocations([
      { id: "hanoi", address: "Hanoi", country: "Vietnam" },
      { id: "hcm", address: "Ho Chi Minh City", country: "Vietnam" },
      { id: "danang", address: "Da Nang", country: "Vietnam" },
      { id: "remote", address: "Remote", country: "Vietnam" },
    ]);

    setIsLoading(false);
  }, []);

  const clearFilters = () => {
    setIndustry("");
    setLocation("");
  };

  const stats = [
    {
      icon: <Building2 className="text-primary size-8" />,
      count: "500+",
      label: "Top Companies",
    },
    {
      icon: <Users className="text-secondary size-8" />,
      count: "20,000+",
      label: "Active Talents",
    },
    {
      icon: <Rocket className="text-accent size-8" />,
      count: "1,200+",
      label: "Jobs Available",
    },
  ];

  const featuredIndustries = [
    { name: "Technology", icon: <Rocket className="size-6" />, count: 150 },
    { name: "Fintech", icon: <TrendingUp className="size-6" />, count: 85 },
    { name: "E-commerce", icon: <Building2 className="size-6" />, count: 120 },
    { name: "Healthcare Tech", icon: <Users className="size-6" />, count: 75 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section with search */}
      <section className="from-secondary to-primary relative bg-gradient-to-r py-24 text-white">
        {/* Abstract shapes decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="bg-accent absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl"></div>
          <div className="bg-primary-foreground absolute top-40 right-10 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="bg-secondary-foreground absolute bottom-10 left-1/3 h-80 w-80 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-white/30 bg-white/10 px-4 py-1 text-white"
            >
              <Sparkles className="mr-1 size-4" /> Discover Your Next Career Move
            </Badge>

            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
              Connect with Top Tech Companies
            </h1>
            <p className="text-primary-foreground mb-10 text-lg">
              Find your perfect match among thousands of verified employers and take your career to
              the next level
            </p>

            {/* Desktop filters */}
            <div className="bg-card rounded-xl p-2 shadow-lg md:flex md:flex-wrap md:gap-2">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search companies by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full border-0 md:w-[180px]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full border-0 md:w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="from-primary to-secondary w-full bg-gradient-to-r md:w-auto">
                Search Companies
              </Button>
              {(industry || location) && (
                <Button variant="ghost" onClick={clearFilters} className="w-full md:w-auto">
                  Clear filters
                </Button>
              )}
            </div>

            {/* Mobile filters */}
            <div className="mt-4 flex flex-col gap-4 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-white/10 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters {(industry || location) && <span className="ml-1">(Active)</span>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[70vh]">
                  <SheetHeader>
                    <SheetTitle>Filter Companies</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Industry</h3>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          {industries.map((ind) => (
                            <SelectItem key={ind.id} value={ind.id}>
                              {ind.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Location</h3>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {locations.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {(industry || location) && (
                      <Button variant="outline" onClick={clearFilters} className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Clear all filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center gap-4">
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold">{stat.count}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Browse by Industry</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Explore companies by industry and find your perfect match in your field of expertise
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredIndustries.map((industry, index) => (
              <Card
                key={index}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="bg-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    {industry.icon}
                  </div>
                  <CardTitle className="mb-2">{industry.name}</CardTitle>
                  <CardDescription>{industry.count} companies</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CompanyCarousel
            companies={topCompanies}
            loading={topCompaniesLoading}
            title="Top Companies"
            description="Leading employers in the tech industry"
          />
        </div>
      </section>

      {/* Popular Companies with gradient background */}
      <section className="from-highlight to-highlight/30 relative bg-gradient-to-br py-16">
        <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 rounded-full opacity-70 blur-3xl"></div>
        <div className="bg-secondary/10 absolute bottom-0 left-20 h-80 w-80 rounded-full opacity-70 blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <PopularCompaniesCarousel />
        </div>
      </section>

      {/* Companies with New Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Companies Actively Hiring</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              These companies have posted new job opportunities in the last 24 hours
            </p>
          </div>
          <NewJobsCompanyGrid searchQuery={searchQuery} industry={industry} location={location} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-secondary to-primary bg-gradient-to-r py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to Take the Next Step?</h2>
            <p className="text-primary-foreground mb-8 text-lg">
              Create your profile now and get noticed by top companies in your industry
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="text-secondary hover:bg-primary-foreground bg-white">
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyListPage;
