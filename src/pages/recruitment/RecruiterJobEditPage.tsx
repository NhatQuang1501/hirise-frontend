import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { AlertCircle, ArrowLeft, Eye, Save, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { DEFAULT_JOB_FORM_VALUES, JobFormValues } from "@/types/job";
import { mockRecruiterJobs } from "@/types/mockData";
import { RecruiterJob } from "@/types/recruiter";
// Import shared components
import JobFormBasicInfo from "@/components/jobPost/JobFormBasicInfo";
import JobFormDescription from "@/components/jobPost/JobFormDescription";
import JobFormDetails from "@/components/jobPost/JobFormDetails";
import JobFormPreview from "@/components/jobPost/JobFormPreview";
import JobFormSettings from "@/components/jobPost/JobFormSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for companies
const mockCompanies = [
  { id: "1", name: "FPT Software" },
  { id: "2", name: "VNG Corporation" },
  { id: "3", name: "Tiki" },
  { id: "4", name: "Shopee" },
];

const RecruiterJobEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobData, setJobData] = useState<RecruiterJob | null>(null);

  // Form setup with react-hook-form
  const form = useForm<JobFormValues>({
    defaultValues: DEFAULT_JOB_FORM_VALUES,
  });

  // Fetch job data
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      setTimeout(() => {
        if (!id) {
          throw new Error("Job ID is required");
        }

        const jobId = parseInt(id);
        const job = mockRecruiterJobs.find((job) => job.id === jobId);

        if (!job) {
          throw new Error("Job not found");
        }

        setJobData(job);

        // Transform job data to form values
        form.reset({
          title: job.title,
          companyId: job.companyId,
          location: job.location,
          jobType: job.contractType,
          // Parse salary range from string (e.g., "$1500 - $2500")
          salaryMin: job.salary.split(" - ")[0].replace("$", ""),
          salaryMax: job.salary.split(" - ")[1].replace("$", ""),
          currency: "VND",
          skills: job.skills,
          level: job.level,
          experience: job.experience,
          deadline: job.deadline,
          responsibilities: job.responsibilities,
          basicRequirements: job.basicRequirements,
          preferredSkills: job.preferredSkills,
          benefits: job.benefits,
          interviewProcess: job.interviewProcess,
          description: job.companyDescription,
          visibility: "public",
          status: job.status,
        });

        setIsLoading(false);
      }, 800);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching job data");
      setIsLoading(false);
    }
  }, [id, form]);

  const onSubmit = (data: JobFormValues) => {
    console.log("Form submitted:", data);

    // For demo purposes, we'll check if they're trying to publish or save as draft
    if (data.status === "Published") {
      console.log("Publishing job...");
      alert("Update and publish job successfully!");
    } else {
      console.log("Saving as draft...");
      alert("Save job as draft successfully!");
    }

    // Redirect to job detail page
    navigate(ROUTES.RECRUITER.JOBS.DETAIL.replace(":id", id || ""));
  };

  // Action buttons based on current form values
  const renderActionButtons = () => {
    const currentStatus = form.watch("status");

    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Save as draft if not published
            form.setValue("status", currentStatus === "Published" ? "Published" : "Draft");
            form.handleSubmit(onSubmit)();
          }}
        >
          <Save className="mr-2 size-4" />
          {currentStatus === "Published" ? "Save changes" : "Save draft"}
        </Button>

        {currentStatus !== "Published" && (
          <Button
            type="button"
            onClick={() => {
              // Publish immediately
              form.setValue("status", "Published");
              form.handleSubmit(onSubmit)();
            }}
          >
            <Send className="mr-2 size-4" />
            Publish
          </Button>
        )}

        {currentStatus === "Closed" && (
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              // Reopen job
              form.setValue("status", "Published");
              form.handleSubmit(onSubmit)();
            }}
          >
            <Send className="mr-2 h-4 w-4" />
            Reopen Job
          </Button>
        )}
      </div>
    );
  };

  // Handle back to detail page
  const handleBack = () => {
    navigate(ROUTES.RECRUITER.JOBS.DETAIL.replace(":id", id || ""));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate(ROUTES.RECRUITER.JOBS.LIST)}>
            <ArrowLeft className="size-4" />
            Back to Job list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2" onClick={handleBack}>
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit job information</h1>
        </div>
        {jobData && (
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              jobData.status === "Published"
                ? "bg-green-100 text-green-800"
                : jobData.status === "Draft"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {jobData.status === "Published"
              ? "Published"
              : jobData.status === "Draft"
                ? "Draft"
                : "Closed"}
          </div>
        )}
      </div>

      <Tabs
        defaultValue="edit"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <JobFormBasicInfo form={form} companies={mockCompanies} />
              <JobFormDetails form={form} />
              <JobFormDescription form={form} />
              <JobFormSettings form={form} />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                {renderActionButtons()}
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="preview">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <JobFormPreview form={form} companies={mockCompanies} />
            </div>

            <div className="bg-muted/50 border-t p-4">
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("edit")}>
                  Edit
                </Button>
                {renderActionButtons()}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterJobEditPage;
