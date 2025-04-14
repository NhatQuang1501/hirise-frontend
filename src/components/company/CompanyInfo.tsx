import React from "react";
import { ROUTES } from "@/routes/routes";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyInfoProps } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import SaveJobButton from "../job/SaveJobButton";

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company,
  companyDescription,
  saved,
  onSaveJob,
}) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Building className="text-primary size-5" />
          About the company
        </h3>
        <p className="text-gray-700">{companyDescription}</p>
        <Link
          to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)}
          className="text-primary mt-3 inline-block hover:underline"
        >
          View company details
        </Link>
      </div>

      <div className="space-y-4">
        <Button className="w-full text-lg" size="lg">
          Apply now
        </Button>
        <SaveJobButton saved={saved} onSaveJob={onSaveJob} className="w-full" />
      </div>
    </div>
  );
};

export default CompanyInfo;
