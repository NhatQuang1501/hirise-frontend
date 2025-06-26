import React from "react";
import { ROUTES } from "@/routes/routes";
import { Building, Globe, Calendar, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyInfoProps } from "@/types/interfaces";
// import { useAuth } from "@/hooks/useAuth";

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company
}) => {
  // const { user, isAuthenticated } = useAuth();

  // Kiểm tra xem có phải là applicant hay không
  // const isApplicant = isAuthenticated && user?.role === "applicant";

  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Building className="text-primary size-5" />
          About the company
        </h3>
        
        <div className="space-y-3 text-gray-700">
          {company.name && (
            <div className="flex items-start gap-2">
              <Building className="size-4 mt-1 text-gray-500" />
              <span>{company.name}</span>
            </div>
          )}
          
          {company.website && (
            <div className="flex items-start gap-2">
              <Globe className="size-4 mt-1 text-gray-500" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {company.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {company.founded_year && (
            <div className="flex items-start gap-2">
              <Calendar className="size-4 mt-1 text-gray-500" />
              <span>Founded in {company.founded_year}</span>
            </div>
          )}
          
          {company.location_names && company.location_names.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="size-4 mt-1 text-gray-500" />
              <span>{company.location_names.join(', ')}</span>
            </div>
          )}
          
          {company.industry_names && company.industry_names.length > 0 && (
            <div className="flex items-start gap-2">
              <Briefcase className="size-4 mt-1 text-gray-500" />
              <span>{company.industry_names.join(', ')}</span>
            </div>
          )}
        </div>
        
        <Link
          to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)}
          className="text-primary mt-4 inline-block hover:underline"
        >
          View company details
        </Link>
      </div>

      {/* Chỉ hiển thị các nút khi là applicant */}
      {/* {isApplicant && (
        <div className="space-y-4">
          <Button className="w-full text-lg" size="lg">
            Apply now
          </Button>
          <SaveJobButton saved={saved} onSaveJob={onSaveJob} className="w-full" />
        </div>
      )} */}
    </div>
  );
};

export default CompanyInfo;
