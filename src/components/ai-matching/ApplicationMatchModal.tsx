import { useState } from "react";
import { MatchingResult, aiMatchingService } from "@/services/ai-matching";
import { FileSearch, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    if (!jobId || !applicationId) return;

    setIsLoading(true);
    setIsProcessing(true);
    try {
      const result = await aiMatchingService.matchSingleApplication(jobId, applicationId);
      if (result && onMatchComplete) {
        onMatchComplete(result);
      }
      setMatchResult(result);
      toast.success("Analysis completed successfully");
    } catch (error) {
      console.error("Error analyzing application:", error);
      toast.error("Failed to analyze application. Please try again later.");
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">AI Matching Analysis</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Analyze the compatibility between the candidate and job requirements
          </DialogDescription>
        </DialogHeader>

        {!matchResult && !isLoading && !isProcessing && (
          <div className="py-8 text-center">
            <FileSearch className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium">Analyze Application Matching Score</h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-gray-500">
              Our AI will analyze how well this application matches the job requirements and provide
              detailed insights.
            </p>
            <Button onClick={handleAnalyze}>Start Analysis</Button>
          </div>
        )}

        {isLoading && (
          <div className="py-12 text-center">
            <Loader2 className="text-primary mx-auto mb-4 h-10 w-10 animate-spin" />
            <p className="mb-2 text-lg font-medium">Analyzing application...</p>
            <p className="text-sm text-gray-500">
              Please wait while our AI evaluates how well this candidate matches the job
              requirements.
            </p>
          </div>
        )}

        {isProcessing && (
          <div className="my-4 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-500">
              Processing in background. This may take a few moments...
            </span>
          </div>
        )}

        {matchResult && (
          <div className="space-y-6">
            <MatchScoreCard score={matchResult.match_percentage} />

            <MatchAnalysisDetails explanation={matchResult.explanation} />

            <SkillsMatchChart detailScores={matchResult.detail_scores} />

            <StrengthsWeaknessesSection
              strengths={matchResult.strengths}
              weaknesses={matchResult.weaknesses}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
