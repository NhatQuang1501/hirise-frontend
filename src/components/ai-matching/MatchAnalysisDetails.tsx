import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchAnalysisDetailsProps {
  explanation: {
    overall: string;
    top_strengths?: string[];
    key_gaps?: string[];
    note: string;
  };
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
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">{explanation.overall}</p>

        {explanation.note && <p className="text-xs text-gray-500 italic">{explanation.note}</p>}
      </CardContent>
    </Card>
  );
}
