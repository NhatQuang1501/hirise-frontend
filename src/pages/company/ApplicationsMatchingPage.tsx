import { useEffect, useState } from "react";
import { MatchingResult, aiMatchingService } from "@/services/ai-matching";
import { jobService } from "@/services/job";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpDown, BarChart2, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { BatchMatchingProgress } from "@/components/ai-matching/BatchMatchingProgress";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

export default function ApplicationsMatchingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [matchResults, setMatchResults] = useState<MatchingResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [selectedRow, setSelectedRow] = useState<MatchingResult | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [jobData, matchData] = await Promise.all([
          jobService.getJobById(id),
          aiMatchingService.getJobMatchResults(id),
        ]);
        setJob(jobData);
        setMatchResults(Array.isArray(matchData) ? matchData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải kết quả đánh giá");
        setMatchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAnalyzeAll = async () => {
    if (!id) return;

    setIsAnalyzing(true);
    setElapsedTime(0);

    // Start a timer to track elapsed time
    const intervalId = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    setTimer(intervalId);

    try {
      const response = await aiMatchingService.matchAllApplications(id);

      // Kiểm tra nếu response có results thì cập nhật matchResults
      if (response.results && Array.isArray(response.results)) {
        setMatchResults(response.results);
        toast.success(`Đã phân tích thành công ${response.results.length} hồ sơ ứng viên`);
      } else {
        toast.info(response.message || "Đã bắt đầu phân tích. Kết quả sẽ sớm có.");
        // Nếu không có kết quả ngay lập tức, thử tải lại sau 5 giây
        setTimeout(async () => {
          try {
            const refreshedData = await aiMatchingService.getJobMatchResults(id);
            if (Array.isArray(refreshedData) && refreshedData.length > 0) {
              setMatchResults(refreshedData);
              toast.success(`Đã tải ${refreshedData.length} kết quả phân tích`);
            }
          } catch (refreshError) {
            console.error("Error refreshing match results:", refreshError);
          }
        }, 5000);
      }
    } catch (error) {
      console.error("Error analyzing applications:", error);
      toast.error("Không thể phân tích hồ sơ ứng viên. Vui lòng thử lại.");
    } finally {
      if (timer) {
        clearInterval(timer);
      }
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up timer on component unmount
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  // Define table columns
  const columns: ColumnDef<MatchingResult>[] = [
    {
      accessorKey: "applicant_name",
      header: ({ column }) => (
        <div className="flex items-center">
          Applicant
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="cursor-pointer font-medium hover:text-blue-600"
          onClick={() => setSelectedRow(row.original)}
        >
          {row.original.applicant_name || "Anonymous"}
        </div>
      ),
    },
    {
      accessorKey: "match_percentage",
      header: ({ column }) => (
        <div className="flex items-center">
          Match Score
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const score = row.original.match_percentage || Math.round(row.original.match_score * 100);

        const getScoreColor = (score: number) => {
          if (score >= 70) return "text-green-600";
          if (score >= 40) return "text-amber-600";
          return "text-red-600";
        };

        const getScoreIcon = (score: number) => {
          if (score >= 70) return <ArrowUp className="h-4 w-4 text-green-600" />;
          if (score >= 40) return <ArrowUpDown className="h-4 w-4 text-amber-600" />;
          return <ArrowDown className="h-4 w-4 text-red-600" />;
        };

        return (
          <div className="flex items-center gap-2">
            <div className={getScoreColor(score)}>{score}%</div>
            {getScoreIcon(score)}
          </div>
        );
      },
      sortingFn: "basic",
    },
    {
      accessorKey: "strengths",
      header: "Key Strengths",
      cell: ({ row }) => {
        const strengths = row.original.strengths || [];
        if (strengths.length === 0) {
          return <span className="text-gray-400 italic">None</span>;
        }

        return (
          <div className="max-w-sm">
            {strengths.slice(0, 2).map((strength, index) => (
              <div key={index} className="truncate text-sm">
                • {strength}
              </div>
            ))}
            {strengths.length > 2 && (
              <div className="text-xs text-gray-400">+{strengths.length - 2} more</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "detail_scores",
      header: "Detail Scores",
      cell: ({ row }) => {
        const detailScores = row.original.detail_scores || {};
        if (Object.keys(detailScores).length === 0) return null;

        // Lấy điểm cao nhất từ detail_scores
        const highestScore = Math.max(
          ...Object.values(detailScores).map((score) => Math.round(score * 100)),
        );

        const getMatchColor = (rate: number) => {
          if (rate >= 70) return "text-green-600";
          if (rate >= 40) return "text-amber-600";
          return "text-red-600";
        };

        return <div className={getMatchColor(highestScore)}>{highestScore}%</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedRow(row.original);
              }}
            >
              <Eye className="mr-1 h-4 w-4" />
              View
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="h-64 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  // Đảm bảo matchResults là một mảng
  const safeMatchResults = Array.isArray(matchResults) ? matchResults : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section với gradient và shadow */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">AI Matching Analysis</h1>
                <p className="mt-1 text-blue-100">{job?.title || "Loading..."}</p>
              </div>
            </div>
            <Button
              onClick={handleAnalyzeAll}
              disabled={isAnalyzing}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze All Applications"}
            </Button>
          </div>
        </div>

        {/* Progress Section với animation */}
        {isAnalyzing && (
          <div className="mb-8">
            <BatchMatchingProgress
              elapsedTime={elapsedTime}
              totalApplications={safeMatchResults.length}
            />
          </div>
        )}

        {/* Stats Cards với thiết kế hiện đại */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
              <div className="mt-2 text-3xl font-bold text-gray-900">{safeMatchResults.length}</div>
              <div className="mt-2 text-sm text-gray-500">Total candidates analyzed</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="text-sm font-medium text-gray-500">Average Match Score</h3>
              <div className="mt-2 text-3xl font-bold text-green-600">
                {safeMatchResults.length > 0
                  ? (
                      safeMatchResults.reduce((acc, curr) => {
                        const score = curr.match_percentage || Math.round(curr.match_score * 100);
                        return acc + score;
                      }, 0) / safeMatchResults.length
                    ).toFixed(1)
                  : 0}
                <span className="text-lg">%</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">Overall match quality</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="text-sm font-medium text-gray-500">High Matches</h3>
              <div className="mt-2 text-3xl font-bold text-purple-600">
                {
                  safeMatchResults.filter((r) => {
                    const score = r.match_percentage || Math.round(r.match_score * 100);
                    return score >= 70;
                  }).length
                }
              </div>
              <div className="mt-2 text-sm text-gray-500">Candidates with ≥70% match</div>
            </div>
          </div>
        </div>

        {/* Results Table với thiết kế hiện đại */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Matching Results</h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed analysis of each application's match with the job requirements
            </p>
          </div>

          {/* Custom styling cho bảng */}
          <style>
            {`
            .custom-table {
              border-collapse: separate;
              border-spacing: 0;
              width: 100%;
            }
            
            .custom-table th {
              background: linear-gradient(to right, #f8fafc, #f1f5f9);
              color: #475569;
              font-weight: 600;
              text-align: left;
              padding: 12px 16px;
              font-size: 0.875rem;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .custom-table tr:hover td {
              background-color: #f8fafc;
            }
            
            .custom-table td {
              padding: 12px 16px;
              border-bottom: 1px solid #f1f5f9;
              transition: all 0.2s;
            }
            
            .custom-table tr:last-child td {
              border-bottom: none;
            }
          `}
          </style>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <DataTable columns={columns} data={safeMatchResults} />
          </div>

          {/* Hiển thị phân tích chi tiết cho hàng được chọn */}
          {selectedRow && (
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <h3 className="mb-2 font-medium text-blue-800">
                Detailed Analysis for {selectedRow.applicant_name || "Anonymous"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Key Strengths</h4>
                  <ul className="mt-2 space-y-1">
                    {selectedRow.strengths?.map((strength, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <span className="mr-2 text-green-500">✓</span> {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Areas to Improve</h4>
                  <ul className="mt-2 space-y-1">
                    {selectedRow.weaknesses?.map((area, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <span className="mr-2 text-amber-500">!</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {selectedRow.explanation && (
                <div className="mt-4 rounded-lg bg-white p-3 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Analysis</h4>
                  <p className="mt-2 text-sm text-gray-700">{selectedRow.explanation.overall}</p>
                  {selectedRow.explanation.note && (
                    <p className="mt-2 text-xs text-gray-500 italic">
                      {selectedRow.explanation.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
