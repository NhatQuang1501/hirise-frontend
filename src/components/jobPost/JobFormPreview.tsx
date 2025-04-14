import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface JobFormPreviewProps {
  form: UseFormReturn<any>;
  companies: { id: string; name: string }[];
}

const JobFormPreview: React.FC<JobFormPreviewProps> = ({ form, companies }) => {
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
          <div>
            {form.watch("salaryMin") && form.watch("salaryMax")
              ? `${form.watch("salaryMin")}-${form.watch("salaryMax")} ${form.watch("currency")}`
              : "Salary not specified"}
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-wrap gap-2">
        {form.watch("skills").map((skill: string, index: number) => (
          <Badge key={index} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
        <ul className="list-disc pl-5">
          {form.watch("responsibilities").map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Requirements</h3>
        <ul className="list-disc pl-5">
          {form.watch("basicRequirements").map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Benefits</h3>
        <ul className="list-disc pl-5">
          {form.watch("benefits").map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobFormPreview;