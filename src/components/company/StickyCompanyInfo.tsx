import { CompanyDetails } from "@/types/company";
import { cn } from "@/lib/utils";

interface StickyCompanyInfoProps {
  company: CompanyDetails;
  isVisible: boolean;
  className?: string;
}

export default function StickyCompanyInfo({
  company,
  isVisible,
  className,
}: StickyCompanyInfoProps) {
  return (
    <div
      className={cn(
        "bg-background border-b py-2 shadow-sm transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-md">
              <img
                src={company.logo || "/placeholder-company-logo.png"}
                alt={`${company.name} logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold">{company.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
