import { useEffect, useState } from "react";
import { CompanyFilter, companyService } from "@/services/company";
import { companiesMetadata } from "@/utils/companyMetadata";
import { Building2, Filter, Rocket, Search, Sparkles, Users, X } from "lucide-react";
import { Company } from "@/types/company";
import { CompanyCard } from "@/components/company/CompanyCard";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("-follower_count");

  // Thêm state để lưu trữ danh sách công ty và phân trang
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Thêm state để theo dõi trạng thái tìm kiếm
  const [isSearching, setIsSearching] = useState(false);

  // Thêm state để lưu các công ty nổi bật
  const [topCompanies, setTopCompanies] = useState<Company[]>([]);
  const [topCompaniesLoading, setTopCompaniesLoading] = useState(true);

  // Fetch companies với filter
  const fetchCompanies = async (page = 1) => {
    setIsLoading(true);
    try {
      const filters: CompanyFilter = {
        page,
        page_size: 9,
        ordering: sortBy,
      };

      // Thêm filter theo từ khóa tìm kiếm
      if (searchQuery) {
        filters.search = searchQuery;
      }

      // Thêm filter theo ngành nghề nếu có
      if (industry && industry !== "all") {
        filters.industry = industry;
      }

      // Thêm filter theo địa điểm nếu có
      if (location && location !== "all") {
        filters.location = location;
      }

      const response = await companyService.getCompanies(filters);
      setCompanies(response.data);
      setPagination({
        currentPage: response.current_page,
        totalPages: response.total_pages,
        totalItems: response.count,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  // Fetch industries và locations
  useEffect(() => {
    document.title = companiesMetadata.title;

    const fetchData = async () => {
      try {
        // Fetch industries
        const industriesResponse = await companyService.getIndustries();
        setIndustries(industriesResponse.results);

        // Fetch locations
        const locationsResponse = await companyService.getLocations();
        setLocations(locationsResponse.results);

        // Fetch top companies
        const fetchTopCompanies = async () => {
          try {
            setTopCompaniesLoading(true);
            const response = await companyService.getPopularCompanies({
              page_size: 6,
              ordering: "-follower_count",
            });
            setTopCompanies(response.data);
          } catch (error) {
            console.error("Error fetching top companies:", error);
          } finally {
            setTopCompaniesLoading(false);
          }
        };

        await Promise.all([fetchTopCompanies()]);
        fetchCompanies();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch companies khi filter thay đổi
  useEffect(() => {
    if (!isSearching) return;
    fetchCompanies(1);
  }, [isSearching]);

  const clearFilters = () => {
    setIndustry("all");
    setLocation("all");
    setSearchQuery("");
    fetchCompanies(1);
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setIsSearching(true);
  };

  // Xử lý khi thay đổi sort
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsSearching(true);
  };

  // Xử lý phân trang
  const handlePageChange = (page: number) => {
    fetchCompanies(page);
  };

  // Xử lý follow/unfollow công ty
  const handleFollowChange = async (companyId: string, isFollowing: boolean) => {
    try {
      setCompanies(
        companies.map((company) =>
          company.id === companyId
            ? {
                ...company,
                isFollowing,
                followerCount: isFollowing ? company.followerCount + 1 : company.followerCount - 1,
              }
            : company,
        ),
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
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

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "-name", label: "Name (Z-A)" },
    { value: "-follower_count", label: "Most Popular" },
    { value: "-created_at", label: "Newest" },
    { value: "created_at", label: "Oldest" },
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
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full border-0 md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="from-primary to-secondary w-full bg-gradient-to-r md:w-auto"
                onClick={handleSearch}
              >
                Search Companies
              </Button>
              {(industry || location || searchQuery) && (
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
                          {locations.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Sort by</h3>
                      <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSearch} className="w-full">
                      Apply Filters
                    </Button>
                    {(industry || location || searchQuery) && (
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

      {/* Companies List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Companies"}
            </h2>
            <p className="text-muted-foreground mt-2">{pagination.totalItems} companies found</p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
                ))}
            </div>
          ) : (
            <>
              {companies.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-xl font-semibold">No companies found</h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords or adjusting the filters.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {companies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      onFollowChange={handleFollowChange}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <ResponsivePagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                  <p className="text-muted-foreground mt-2 text-center text-sm">
                    Showing {(pagination.currentPage - 1) * 9 + 1}-
                    {Math.min(pagination.currentPage * 9, pagination.totalItems)} of{" "}
                    {pagination.totalItems} companies
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CompanyCarousel - Giữ lại phần Featured Companies */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <CompanyCarousel
            companies={topCompanies}
            loading={topCompaniesLoading}
            title="Featured Companies"
            description="Leading employers in the tech industry"
          />
        </div>
      </section>
    </div>
  );
};

export default CompanyListPage;
