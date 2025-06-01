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
  // Xử lý trường hợp chỉ có requirements (chuỗi)
  if (requirements && !basicRequirements) {
    if (typeof requirements !== "string" && !Array.isArray(requirements)) return null;

    // Chuyển đổi sang chuỗi nếu là mảng
    const reqString = Array.isArray(requirements) ? requirements.join("\n") : requirements;

    // Tìm phần preferred skills bằng marker
    const preferredSkillsMarker = "### PREFERRED SKILLS ###";
    const markerIndex = reqString.indexOf(preferredSkillsMarker);

    if (markerIndex === -1) {
      // Không tìm thấy marker, tất cả đều là basic requirements
      const basicLines = reqString.split("\n").filter((line) => line.trim() !== "");

      return renderRequirements(basicLines, []);
    } else {
      // Tìm thấy marker, phân chia nội dung
      const basicPart = reqString.substring(0, markerIndex).trim();
      const preferredPart = reqString.substring(markerIndex + preferredSkillsMarker.length).trim();

      const basicLines = basicPart.split("\n").filter((line) => line.trim() !== "");

      const preferredLines = preferredPart.split("\n").filter((line) => line.trim() !== "");

      return renderRequirements(basicLines, preferredLines);
    }
  }

  // Xử lý trường hợp có sẵn basicRequirements và preferredSkills
  const basicLines = processInput(basicRequirements);
  const preferredLines = processInput(preferredSkills);

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
