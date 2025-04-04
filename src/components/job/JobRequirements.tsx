import React from "react";

interface JobRequirementsProps {
  basicRequirements: string[];
  preferredSkills: string[];
}

const JobRequirements: React.FC<JobRequirementsProps> = ({
  basicRequirements,
  preferredSkills,
}) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <span className="text-primary inline-block">📌</span> Requirements
      </h3>

      <h4 className="mb-2 font-medium">Basic requirements:</h4>
      <ul className="mb-6 ml-6 list-disc space-y-2">
        {basicRequirements.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>

      <h4 className="mb-2 font-medium">Preferred skills - Nice to have:</h4>
      <ul className="ml-6 list-disc space-y-2">
        {preferredSkills.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRequirements;
