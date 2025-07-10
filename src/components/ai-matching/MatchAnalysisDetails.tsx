import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchExplanation {
  overall: string;
  top_strengths?: string[];
  key_gaps?: string[];
  note: string;
}

interface MatchAnalysisDetailsProps {
  explanation: MatchExplanation;
  className?: string;
}

export function MatchAnalysisDetails({ explanation, className }: MatchAnalysisDetailsProps) {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5 text-blue-500" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{explanation.overall}</p>

        {explanation.top_strengths && explanation.top_strengths.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-800">Top Strengths</h3>
            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
              {explanation.top_strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {explanation.key_gaps && explanation.key_gaps.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-800">Areas for Improvement</h3>
            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
              {explanation.key_gaps.map((gap, index) => (
                <li key={index}>{gap}</li>
              ))}
            </ul>
          </div>
        )}

        {explanation.note && <p className="text-xs text-gray-500 italic">{explanation.note}</p>}
      </CardContent>
    </Card>
  );
}
