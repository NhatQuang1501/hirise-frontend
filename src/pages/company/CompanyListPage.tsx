import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { topCompaniesData } from "@/types/mockData";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import NewJobsCompanyGrid from "@/components/company/NewJobsCompanyGrid";
import PopularCompaniesCarousel from "@/components/company/PopularCompaniesCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companiesMetadata } from "../../utils/companyMetadata";

const CompanyListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  // Update metadata when component mounts
  useEffect(() => {
    document.title = companiesMetadata.title;
    // Update other meta tags
  }, []);

  const clearFilters = () => {
    setIndustry("");
    setLocation("");
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section with search */}
      <section className="from-primary/10 to-secondary/5 bg-gradient-to-r py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold">Discover Top Tech Companies</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Find your next career opportunity at the world's leading technology companies
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search companies by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Fintech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="healthcare">Healthcare Tech</SelectItem>
                  <SelectItem value="edu">Education Tech</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hanoi">Hanoi</SelectItem>
                  <SelectItem value="hcm">Ho Chi Minh City</SelectItem>
                  <SelectItem value="danang">Da Nang</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              {(industry || location) && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CompanyCarousel
            companies={topCompaniesData}
            title="Top Companies"
            description="Leading employers in the tech industry"
          />
        </div>
      </section>

      {/* Popular Companies */}
      <section className="border-y bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <PopularCompaniesCarousel />
        </div>
      </section>

      {/* Companies with New Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewJobsCompanyGrid searchQuery={searchQuery} industry={industry} location={location} />
        </div>
      </section>
    </div>
  );
};

export default CompanyListPage;
