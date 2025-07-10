import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrengthsWeaknessesSectionProps {
  strengths: string[];
  weaknesses: string[];
  className?: string;
}

export function StrengthsWeaknessesSection({
  strengths,
  weaknesses,
  className,
}: StrengthsWeaknessesSectionProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Key Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No key strengths identified</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Areas to Improve
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weaknesses.length > 0 ? (
            <ul className="space-y-2">
              {weaknesses.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No areas to improve identified</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
