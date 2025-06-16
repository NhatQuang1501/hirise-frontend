import { useState } from "react";
import { MatchingResult, aiMatchingService } from "@/services/ai-matching";
import { FileSearch, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MatchAnalysisDetails } from "./MatchAnalysisDetails";
import { MatchScoreCard } from "./MatchScoreCard";
import { SkillsMatchChart } from "./SkillsMatchChart";
import { StrengthsWeaknessesSection } from "./StrengthsWeaknessesSection";

interface ApplicationMatchModalProps {
  jobId: string;
  applicationId: string;
  children: React.ReactNode;
  onMatchComplete?: (result: MatchingResult) => void;
}

export function ApplicationMatchModal({
  jobId,
  applicationId,
  children,
  onMatchComplete,
}: ApplicationMatchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);

  const handleMatch = async () => {
    setIsLoading(true);

    try {
      const result = await aiMatchingService.matchSingleApplication(jobId, applicationId);
      setMatchResult(result);
      if (onMatchComplete) {
        onMatchComplete(result);
      }
    } catch (error) {
      console.error("Error matching application:", error);
      toast.error("Failed to analyze application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">AI Matching Analysis</DialogTitle>
        </DialogHeader>

        {!matchResult && !isLoading && (
          <div className="py-8 text-center">
            <FileSearch className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium">Analyze Application Matching Score</h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-gray-500">
              Our AI will analyze how well this application matches the job requirements and provide
              detailed insights.
            </p>
            <Button onClick={handleMatch}>Start Analysis</Button>
          </div>
        )}

        {isLoading && (
          <div className="py-12 text-center">
            <Loader2 className="text-primary mx-auto mb-4 h-10 w-10 animate-spin" />
            <p className="mb-2 text-lg font-medium">Analyzing application...</p>
            <p className="text-sm text-gray-500">
              Please wait while our AI evaluates how well this candidate matches the job
              requirements. This usually takes about 10 seconds.
            </p>
          </div>
        )}

        {matchResult && (
          <div className="space-y-6">
            <MatchScoreCard score={matchResult.match_score} />

            <MatchAnalysisDetails analysis={matchResult.analysis} />

            <SkillsMatchChart skillsMatch={matchResult.skills_match} />

            <StrengthsWeaknessesSection
              keyStrengths={matchResult.key_strengths}
              areasToImprove={matchResult.areas_to_improve}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
