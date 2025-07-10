import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DetailScoresProps {
  detailScores: Record<string, number>;
  className?: string;
}

export function SkillsMatchChart({ detailScores, className }: DetailScoresProps) {
  // Format score labels for display
  const formatScoreLabel = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/cv/g, "CV")
      .replace(/job/g, "Job")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code2 className="h-5 w-5 text-blue-500" />
          Detailed Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(detailScores).map(([key, value]) => (
            <div key={key}>
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">{formatScoreLabel(key)}</span>
                <span className="text-sm font-medium">{Math.round(value * 100)}%</span>
              </div>
              <Progress value={value * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
