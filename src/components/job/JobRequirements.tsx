import React from "react";

interface JobRequirementsProps {
  requirements?: string[] | string;
  basicRequirements?: string[] | string;
  preferredSkills?: string[] | string;
}

const JobRequirements: React.FC<JobRequirementsProps> = ({
  requirements,
  basicRequirements,
  preferredSkills,
}) => {
  // Xử lý các trường đầu vào
  let basicLines: string[] = [];
  let preferredLines: string[] = [];

  // Ưu tiên sử dụng basicRequirements và preferredSkills nếu có
  if (basicRequirements) {
    basicLines = processInput(basicRequirements);
  } else if (requirements) {
    // Nếu không có basicRequirements, sử dụng requirements
    basicLines = processInput(requirements);
  }

  // Xử lý preferredSkills nếu có
  if (preferredSkills) {
    preferredLines = processInput(preferredSkills);
  }

  return renderRequirements(basicLines, preferredLines);
};

// Hàm xử lý đầu vào, chuyển đổi thành mảng
const processInput = (input?: string[] | string): string[] => {
  if (!input) return [];

  if (Array.isArray(input)) return input.filter((line) => line.trim() !== "");

  return input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.replace(/^-\s*/, "").trim());
};

// Hàm render giao diện
const renderRequirements = (basicLines: string[], preferredLines: string[]) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <span className="text-primary inline-block">📌</span> Requirements
      </h3>

      <h4 className="mb-2 font-medium">Basic requirements:</h4>
      <ul className="mb-6 ml-6 list-disc space-y-2">
        {basicLines.length > 0 ? (
          basicLines.map((line, index) => (
            <li key={index} className="text-gray-700">
              {line.replace(/^-\s*/, "").trim()}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No basic requirements specified</li>
        )}
      </ul>

      {preferredLines.length > 0 && (
        <>
          <h4 className="mb-2 font-medium">Preferred skills - Nice to have:</h4>
          <ul className="ml-6 list-disc space-y-2">
            {preferredLines.map((line, index) => (
              <li key={index} className="text-gray-700">
                {line.replace(/^-\s*/, "").trim()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobRequirements;
