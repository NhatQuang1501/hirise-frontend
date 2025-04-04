import React from "react";

interface JobBenefitsProps {
  benefits: string[];
}

const JobBenefits: React.FC<JobBenefitsProps> = ({ benefits }) => {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <span className="text-primary inline-block">📌</span> Benefits
      </h3>
      <ul className="ml-6 list-disc space-y-2">
        {benefits.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobBenefits;
