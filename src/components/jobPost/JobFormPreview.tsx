import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface JobFormPreviewProps {
  form: UseFormReturn<any>;
  companies: { id: string; name: string }[];
}

const JobFormPreview: React.FC<JobFormPreviewProps> = ({ form, companies }) => {
  const skills = form.watch("skills") || [];
  const responsibilities = form.watch("responsibilities") || "";
  const basicRequirements = form.watch("basicRequirements") || "";
  const preferredSkills = form.watch("preferredSkills") || "";
  const benefits = form.watch("benefits") || "";

  // Chuyển đổi text có định dạng bullet thành mảng
  const parseToArray = (text: string) => {
    if (!text) return [];
    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.trim().replace(/^-\s*/, "").trim());
  };

  const getCityDisplay = (cityCode: string) => {
    const cityMap: Record<string, string> = {
      hanoi: "Ha Noi",
      hochiminh: "Ho Chi Minh",
      danang: "Da Nang",
      hue: "Hue",
      cantho: "Can Tho",
      others: "Others",
    };

    return cityCode ? cityMap[cityCode] || cityCode : "";
  };

  const responsibilitiesArray = parseToArray(responsibilities);
  const basicRequirementsArray = parseToArray(basicRequirements);
  const preferredSkillsArray = parseToArray(preferredSkills);
  const benefitsArray = parseToArray(benefits);

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{form.watch("title") || "Job Title"}</h2>
        <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-1">
            {companies.find((c) => c.id === form.watch("companyId"))?.name || "Company"}
          </div>
          <div>•</div>
          <div>{form.watch("location") || "Location"}</div>
          <div>•</div>
          <div>{getCityDisplay(form.watch("city")) || "City"}</div>
          <div>•</div>
          <div>
            {form.watch("salaryMin") && form.watch("salaryMax")
              ? `${form.watch("salaryMin")}-${form.watch("salaryMax")} ${form.watch("currency")}`
              : "Salary not specified"}
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <Badge key={index} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
        {responsibilitiesArray.length > 0 ? (
          <ul className="list-disc pl-5">
            {responsibilitiesArray.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No responsibilities specified</p>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Basic Requirements</h3>
        {basicRequirementsArray.length > 0 ? (
          <ul className="list-disc pl-5">
            {basicRequirementsArray.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No requirements specified</p>
        )}
      </div>

      {preferredSkillsArray.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Preferred Skills (Nice to have)</h3>
          <ul className="list-disc pl-5">
            {preferredSkillsArray.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-lg font-semibold">Benefits</h3>
        {benefitsArray.length > 0 ? (
          <ul className="list-disc pl-5">
            {benefitsArray.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No benefits specified</p>
        )}
      </div>
    </div>
  );
};

export default JobFormPreview;
