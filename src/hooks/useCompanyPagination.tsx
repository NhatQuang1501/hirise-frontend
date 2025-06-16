import { useEffect, useState } from "react";
import { CompanyFilter, companyService } from "@/services/company";
import { Company } from "@/types/company";

interface UseCompanyPaginationProps {
  initialFilters?: CompanyFilter;
  fetchPopular?: boolean;
}

interface UseCompanyPaginationResult {
  companies: Company[];
  loading: boolean;
  error: Error | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<CompanyFilter>) => void;
  refresh: () => Promise<void>;
}

export const useCompanyPagination = ({
  initialFilters = {},
  fetchPopular = false,
}: UseCompanyPaginationProps = {}): UseCompanyPaginationResult => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialFilters.page || 1);
  const [filters, setFilters] = useState<CompanyFilter>({
    page_size: 12,
    ...initialFilters,
  });

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const fetchFunction = fetchPopular
        ? companyService.getPopularCompanies
        : companyService.getCompanies;

      const response = await fetchFunction({
        ...filters,
        page: currentPage,
      });

      setCompanies(response.data);
      setTotalItems(response.count);
      setTotalPages(response.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, filters, fetchPopular]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const updateFilters = (newFilters: Partial<CompanyFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const refresh = async () => {
    await fetchCompanies();
  };

  return {
    companies,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    setPage,
    setFilters: updateFilters,
    refresh,
  };
};
