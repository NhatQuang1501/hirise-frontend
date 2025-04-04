import React from "react";

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

const JobResponsibilities: React.FC<JobResponsibilitiesProps> = ({ responsibilities }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <span className="text-primary inline-block">📌</span> Responsibilities
      </h3>
      <ul className="ml-6 list-disc space-y-2">
        {responsibilities.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobResponsibilities;
