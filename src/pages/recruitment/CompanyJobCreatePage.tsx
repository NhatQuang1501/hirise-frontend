import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import jobService from "@/services/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DEFAULT_JOB_FORM_VALUES, JobFormValues, jobFormSchema } from "@/types/job";
import { useAuth } from "@/hooks/useAuth";
import JobFormBasicInfo from "@/components/jobPost/JobFormBasicInfo";
import JobFormDescription from "@/components/jobPost/JobFormDescription";
import JobFormDetails from "@/components/jobPost/JobFormDetails";
import JobFormPreview from "@/components/jobPost/JobFormPreview";
import JobFormSettings from "@/components/jobPost/JobFormSettings";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CompanyJobCreatePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Kiểm tra thêm một lần nữa tại component
    if (!isAuthenticated) {
      toast.error("You need to login to create a new job");
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }

    if (user.role !== "company") {
      toast.error("Only companies can create new jobs");
      navigate(ROUTES.PUBLIC.HOME);
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Form setup with react-hook-form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema) as any,
    defaultValues: DEFAULT_JOB_FORM_VALUES,
  });

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      if (!data.jobType || data.jobType.trim() === "") {
        data.jobType = "full time";
      }

      // Log dữ liệu trước khi gửi (để debug)
      console.log("Submitting job data:", data);

      const response = await jobService.createJob(data);

      if (data.status === "Published") {
        toast.success("Job published successfully!");
      } else {
        toast.success("Job saved as draft!");
      }

      // Redirect to job details or job list
      navigate(ROUTES.COMPANY.JOBS.LIST);
    } catch (error: any) {
      console.error("Error creating job:", error);

      // Hiển thị lỗi chi tiết hơn để debug
      if (error.response?.data) {
        console.error("Server error details:", error.response.data);

        // Hiển thị lỗi cụ thể nếu có
        if (typeof error.response.data === "object") {
          Object.entries(error.response.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) => toast.error(`${field}: ${message}`));
            } else {
              toast.error(`${field}: ${messages}`);
            }
          });
        } else {
          toast.error(error.response.data);
        }
      } else {
        toast.error(error.message || "Failed to create job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render action buttons cho Create page
  const renderActionButtons = () => {
    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => {
            form.setValue("status", "Draft");
            form.handleSubmit(onSubmit as SubmitHandler<any>)();
          }}
        >
          <Save className="mr-2 size-4" />
          Save draft
        </Button>

        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            form.setValue("status", "Published");
            form.handleSubmit(onSubmit as SubmitHandler<any>)();
          }}
        >
          {isSubmitting ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <Send className="mr-2 size-4" />
          )}
          Publish
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="mr-2"
          onClick={() => navigate(ROUTES.COMPANY.JOBS.LIST)}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-bold">Create new job</h1>
      </div>

      <Tabs
        defaultValue="create"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit as SubmitHandler<any>)}
              className="space-y-6"
            >
              <JobFormBasicInfo form={form} />
              <JobFormDetails form={form} />
              <JobFormDescription form={form} />
              <JobFormSettings form={form} />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-2 size-4" />
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
              <JobFormPreview form={form} companies={[]} />
            </div>

            <div className="bg-muted/50 border-t p-4">
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("create")}>
                  Back to editing
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

export default CompanyJobCreatePage;
