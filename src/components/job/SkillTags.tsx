import React from "react";
import { Tags } from "lucide-react";

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
      <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
        <Tags className="text-primary size-5" />
        Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTags;
