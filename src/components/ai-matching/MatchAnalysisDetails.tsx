import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchAnalysisDetailsProps {
  analysis: string;
  className?: string;
}

export function MatchAnalysisDetails({ analysis, className }: MatchAnalysisDetailsProps) {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5 text-blue-500" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{analysis}</p>
      </CardContent>
    </Card>
  );
}
