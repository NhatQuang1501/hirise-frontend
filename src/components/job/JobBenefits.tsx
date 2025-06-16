import React from "react";

interface JobBenefitsProps {
  benefits: string[] | string;
}

const JobBenefits: React.FC<JobBenefitsProps> = ({ benefits }) => {
  if (!benefits || (Array.isArray(benefits) && benefits.length === 0)) return null;

  // Chuyển đổi sang mảng nếu là chuỗi
  const lines = Array.isArray(benefits)
    ? benefits
    : benefits
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.replace(/^-\s*/, ""));

  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <span className="text-primary inline-block">📌</span> Benefits
      </h3>
      <ul className="ml-6 list-disc space-y-2">
        {lines.map((line, index) => (
          <li key={index} className="text-gray-700">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobBenefits;
