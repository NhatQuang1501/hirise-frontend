import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/lib/utils";

interface MatchScoreCardProps {
  score: number;
  className?: string;
}

export function MatchScoreCard({ score, className }: MatchScoreCardProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };

  // Get match level text
  const getMatchLevelText = (score: number) => {
    if (score >= 70) return "Excellent Match";
    if (score >= 40) return "Good Match";
    return "Low Match";
  };

  // Format score to 1 decimal place
  const formattedScore = Math.round(score * 10) / 10;

  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-md", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1 text-lg font-semibold">Match Score</h3>
          <p className={cn("text-3xl font-bold", getScoreColor(score))}>{formattedScore}%</p>
          <p className={cn("text-sm", getScoreColor(score))}>{getMatchLevelText(score)}</p>
        </div>
        <div className="h-24 w-24">
          <CircularProgressbar
            value={score}
            maxValue={100}
            text={`${formattedScore}%`}
            styles={buildStyles({
              textSize: "24px",
              pathColor: score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444",
              textColor: score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444",
              trailColor: "#e6e6e6",
            })}
          />
        </div>
      </div>
    </div>
  );
}
