import { Code2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillsMatchProps {
  skillsMatch: {
    match_rate: string;
    matching_skills: string[];
    missing_skills: string[];
    total_job_skills: number;
    total_cv_skills: number;
  };
  className?: string;
}

export function SkillsMatchChart({ skillsMatch, className }: SkillsMatchProps) {
  // Extract numeric value from match_rate (e.g., "70.5%" -> 70.5)
  const matchRateValue = parseFloat(skillsMatch.match_rate);

  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code2 className="h-5 w-5 text-blue-500" />
          Skills Match
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-medium">Match Rate</span>
            <span className="text-sm font-medium">{skillsMatch.match_rate}</span>
          </div>
          <Progress value={matchRateValue} className="h-2" />
        </div>

        {skillsMatch.matching_skills.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold">Matching Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skillsMatch.matching_skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skillsMatch.missing_skills.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-sm font-semibold">
              <XCircle className="h-4 w-4 text-red-500" />
              Missing Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsMatch.missing_skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
