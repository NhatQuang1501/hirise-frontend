import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { aiMatchingService } from "@/services/ai-matching";
import { applicationService } from "@/services/application";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  BarChart2,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { ApplicationStatusButtons } from "@/components/application/ApplicationStatusButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApplicationDetailPage: React.FC = () => {
  const { id, applicationId } = useParams<{ id: string; applicationId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Đưa fetchData ra khỏi useEffect để có thể gọi lại
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const applicationData = await applicationService.getApplicationById(applicationId as string);
      setApplication(applicationData);
      document.title = `${applicationData.applicant_profile?.full_name || "Application"} | HiRise`;

      // Fetch match results
      if (id) {
        try {
          const matchResults = await aiMatchingService.getJobMatchResults(id);
          const result = matchResults.find((match) => match.application === applicationId);
          if (result) {
            setMatchResult(result);
          }
        } catch (error) {
          console.error("No existing match results found:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to load application details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Kiểm tra quyền truy cập
    if (!user || user.role !== "company") {
      toast.error("Only companies can access this page");
      navigate(ROUTES.PUBLIC.HOME);
      return;
    }

    if (!id || !applicationId) return;

    fetchData();
  }, [id, applicationId, user, navigate]);

  const handleAnalyze = async () => {
    if (!id || !applicationId) return;

    setIsAnalyzing(true);

    try {
      const result = await aiMatchingService.matchSingleApplication(id, applicationId);
      setMatchResult(result);
      toast.success("Successfully analyzed application match score");
    } catch (error) {
      console.error("Error analyzing application:", error);
      toast.error("Failed to analyze application. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="gap-1 border-blue-200 bg-blue-100 text-blue-800">
            <Clock className="h-3.5 w-3.5" />
            Pending Review
          </Badge>
        );
      case "reviewing":
        return (
          <Badge className="gap-1 border-purple-200 bg-purple-100 text-purple-800">
            <FileText className="h-3.5 w-3.5" />
            Reviewing
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="gap-1 border-green-200 bg-green-100 text-green-800">
            <CheckCircle className="h-3.5 w-3.5" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="gap-1 border-red-200 bg-red-100 text-red-800">
            <XCircle className="h-3.5 w-3.5" />
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <FileText className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Application Not Found</h2>
          <p className="mb-6 text-gray-600">
            The application you're looking for does not exist or you don't have permission to view
            it.
          </p>
          <Button
            onClick={() => navigate(ROUTES.COMPANY.JOBS.APPLICATIONS.replace(":id", id || ""))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto space-y-6 px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(ROUTES.COMPANY.JOBS.APPLICATIONS.replace(":id", id || ""))}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  {application.applicant_profile?.full_name || "Anonymous"}
                </h1>
                <div className="mt-1 flex items-center gap-2 text-blue-100">
                  <p>{application.job_details?.title || "Job Application"}</p>
                  <span>•</span>
                  <p>
                    Applied{" "}
                    {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {application.status === "pending" || application.status === "reviewing" ? (
                <ApplicationStatusButtons
                  applicationId={applicationId as string}
                  status={application.status}
                  onStatusChange={() => {
                    // Refresh application data after status change
                    fetchData();
                  }}
                  size="default"
                />
              ) : (
                <div className="text-right">{getStatusBadge(application.status)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Applicant Card */}
            <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
              <div className="flex justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-3xl font-bold text-white">
                  {application.applicant_profile?.full_name
                    ? application.applicant_profile.full_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .substring(0, 2)
                    : "A"}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {application.applicant_profile?.full_name || "Anonymous"}
                    </h3>
                    {application.applicant_profile?.email && (
                      <div className="mt-1 flex items-center gap-2 text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span>{application.applicant_profile.email}</span>
                      </div>
                    )}
                    {application.applicant_profile?.phone && (
                      <div className="mt-1 flex items-center gap-2 text-gray-500">
                        <Phone className="h-4 w-4" />
                        <span>{application.applicant_profile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-500">Application Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>
                          Applied on {format(new Date(application.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <span>{application.job_details?.title || "Job Position"}</span>
                      </div>
                      {application.job_details?.city_display && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{application.job_details.city_display}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {application.cv_file && (
                    <div className="pt-4">
                      <Button className="w-full gap-2" asChild>
                        <a href={application.cv_file} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Download CV
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Match Score Card */}
            <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-blue-500" />
                    <span>Match Score</span>
                  </div>
                  {matchResult ? (
                    <div
                      className={`text-2xl font-bold ${getScoreColorClass(matchResult.match_score)}`}
                    >
                      {matchResult.match_score.toFixed(1)}%
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 italic">Not analyzed</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {matchResult ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-500">Analysis Summary</h4>
                      <p className="text-sm text-gray-700">{matchResult.analysis}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-500">Skills Match</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Match Rate</span>
                        <span
                          className={`font-medium ${getScoreColorClass(parseFloat(matchResult.skills_match.match_rate))}`}
                        >
                          {matchResult.skills_match.match_rate}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("analysis")}
                    >
                      View Full Analysis
                    </Button>
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <p className="mb-4 text-sm text-gray-500">
                      This application hasn't been analyzed yet. Run AI analysis to get match score
                      and insights.
                    </p>
                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart2 className="h-4 w-4" />
                          Analyze Match
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6 lg:col-span-3">
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="cv" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span>CV & Cover Letter</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="gap-2" disabled={!matchResult}>
                  <BarChart2 className="h-4 w-4" />
                  <span>AI Analysis</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      Applicant Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {application.applicant_profile?.full_name || "Anonymous"}
                        </h3>
                        {application.applicant_profile?.email && (
                          <div className="mt-1 flex items-center gap-2 text-gray-500">
                            <Mail className="h-4 w-4" />
                            <span>{application.applicant_profile.email}</span>
                          </div>
                        )}
                        {application.applicant_profile?.phone && (
                          <div className="mt-1 flex items-center gap-2 text-gray-500">
                            <Phone className="h-4 w-4" />
                            <span>{application.applicant_profile.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-500">
                          Application Details
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>
                              Applied on {format(new Date(application.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Briefcase className="h-4 w-4 text-blue-500" />
                            <span>{application.job_details?.title || "Job Position"}</span>
                          </div>
                          {application.job_details?.city_display && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              <span>{application.job_details.city_display}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {application.cover_letter && (
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">Cover Letter</h4>
                          <div className="prose max-w-none">
                            <p className="text-gray-700">{application.cover_letter}</p>
                          </div>
                        </div>
                      )}

                      {application.cv_file && (
                        <div className="border-t border-gray-100 pt-4">
                          <Button className="w-full gap-2" asChild>
                            <a href={application.cv_file} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                              Download CV
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Thêm thông tin về trạng thái ứng dụng */}
                <Card className="shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      Application Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Current Status</span>
                        <div>{getStatusBadge(application.status)}</div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-500">Timeline</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>
                              Applied on {format(new Date(application.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                          {application.updated_at &&
                            application.updated_at !== application.created_at && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <span>
                                  Last updated on{" "}
                                  {format(new Date(application.updated_at), "MMM d, yyyy")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      {(application.status === "pending" || application.status === "reviewing") && (
                        <div className="border-t border-gray-100 pt-4">
                          <ApplicationStatusButtons
                            applicationId={applicationId as string}
                            status={application.status}
                            onStatusChange={() => {
                              // Refresh application data after status change
                              fetchData();
                            }}
                            size="default"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* CV Tab */}
              <TabsContent value="cv">
                <Card className="shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      CV & Cover Letter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {application.cv_file ? (
                      <div className="space-y-6">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-200">
                          <iframe
                            src={application.cv_file}
                            className="h-full w-full"
                            title="CV Preview"
                          ></iframe>
                        </div>
                        <div className="flex justify-center">
                          <Button className="gap-2" asChild>
                            <a href={application.cv_file} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                              Download CV
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <h3 className="mb-2 text-lg font-medium text-gray-700">No CV Attached</h3>
                        <p className="text-gray-500">
                          This applicant didn't attach a CV to their application.
                        </p>
                      </div>
                    )}

                    {application.cover_letter && (
                      <div className="mt-8 border-t border-gray-100 pt-8">
                        <h3 className="mb-4 text-lg font-medium">Cover Letter</h3>
                        <div className="prose max-w-none">
                          <p>{application.cover_letter}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis">
                {matchResult ? (
                  <div className="space-y-6">
                    {/* Match Score Overview */}
                    <Card className="shadow-md transition-shadow hover:shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-5 w-5 text-blue-500" />
                            <span>Match Score Overview</span>
                          </div>
                          <div
                            className={`text-2xl font-bold ${getScoreColorClass(matchResult.match_score)}`}
                          >
                            {matchResult.match_score.toFixed(1)}%
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <p className="text-gray-700">{matchResult.analysis}</p>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Strengths */}
                            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                              <h3 className="mb-3 flex items-center gap-2 font-medium text-green-800">
                                <CheckCircle className="h-4 w-4" />
                                Key Strengths
                              </h3>
                              <ul className="space-y-2">
                                {matchResult.key_strengths?.map(
                                  (strength: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-center text-sm text-gray-700"
                                    >
                                      <span className="mr-2 text-green-500">✓</span> {strength}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>

                            {/* Areas to Improve */}
                            <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                              <h3 className="mb-3 flex items-center gap-2 font-medium text-amber-800">
                                <XCircle className="h-4 w-4" />
                                Areas to Improve
                              </h3>
                              <ul className="space-y-2">
                                {matchResult.areas_to_improve?.map(
                                  (area: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-center text-sm text-gray-700"
                                    >
                                      <span className="mr-2 text-amber-500">!</span> {area}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Skills Match */}
                    <Card className="shadow-md transition-shadow hover:shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          Skills Match
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Match Rate</span>
                            <span
                              className={`font-medium ${getScoreColorClass(parseFloat(matchResult.skills_match.match_rate))}`}
                            >
                              {matchResult.skills_match.match_rate}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Matching Skills */}
                            <div>
                              <h3 className="mb-3 font-medium text-gray-700">Matching Skills</h3>
                              {matchResult.skills_match.matching_skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {matchResult.skills_match.matching_skills.map(
                                    (skill: string, index: number) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-green-200 bg-green-50 text-green-700"
                                      >
                                        {skill}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">No matching skills found</p>
                              )}
                            </div>

                            {/* Missing Skills */}
                            <div>
                              <h3 className="mb-3 font-medium text-gray-700">Missing Skills</h3>
                              {matchResult.skills_match.missing_skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {matchResult.skills_match.missing_skills.map(
                                    (skill: string, index: number) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-amber-200 bg-amber-50 text-amber-700"
                                      >
                                        {skill}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">No missing skills</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Detailed Scores */}
                    <Card className="shadow-md transition-shadow hover:shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart2 className="h-5 w-5 text-blue-500" />
                          Detailed Scores
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(matchResult.detailed_scores).map(
                              ([key, value]: [string, any]) => {
                                const score = value * 100;
                                const formattedKey = key
                                  .split("_")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ");

                                return (
                                  <div key={key} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-700">{formattedKey}</span>
                                      <span
                                        className={`text-sm font-medium ${getScoreColorClass(score)}`}
                                      >
                                        {score.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                      <div
                                        className={`h-full ${getScoreBackgroundClass(score)}`}
                                        style={{ width: `${score}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>

                          <div className="border-t border-gray-100 pt-4">
                            <h3 className="mb-3 font-medium text-gray-700">Score Interpretation</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>70%+ indicates excellent match</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>40-69% indicates moderate match</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span>Below 40% indicates poor match</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="shadow-md">
                    <CardContent className="p-8 text-center">
                      <BarChart2 className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-700">
                        No Analysis Available
                      </h3>
                      <p className="mb-6 text-gray-500">
                        This application hasn't been analyzed yet. Run AI analysis to get match
                        score and insights.
                      </p>
                      <Button onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2">
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <BarChart2 className="h-4 w-4" />
                            Analyze Match
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for color classes
const getScoreColorClass = (score: number) => {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
};

const getScoreBackgroundClass = (score: number) => {
  if (score >= 70) return "bg-gradient-to-r from-green-400 to-green-500";
  if (score >= 40) return "bg-gradient-to-r from-amber-400 to-amber-500";
  return "bg-gradient-to-r from-red-400 to-red-500";
};

export default ApplicationDetailPage;
