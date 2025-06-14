import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import jobService from "@/services/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

const CompanyJobEditPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form setup with react-hook-form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema) as any,
    defaultValues: DEFAULT_JOB_FORM_VALUES,
  });

  useEffect(() => {
    // Kiểm tra quyền truy cập
    if (!isAuthenticated) {
      toast.error("You need to login to edit a job");
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }

    if (user.role !== "company") {
      toast.error("Only companies can edit jobs");
      navigate(ROUTES.PUBLIC.HOME);
      return;
    }

    // Lấy thông tin job cần sửa
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const jobData = await jobService.getJobById(id as string);

        // Hàm thêm dấu gạch đầu dòng cho nội dung hiển thị
        const addBulletPoints = (text: string): string => {
          if (!text) return "";
          return text
            .split("\n")
            .map((line) => (line.trim() ? (line.startsWith("- ") ? line : `- ${line}`) : line))
            .join("\n");
        };

        // Cập nhật form với dữ liệu hiện có
        form.reset({
          title: jobData.title || "",
          companyId: jobData.company?.id || "",
          location: jobData.locations?.[0]?.address || "",
          city: jobData.city || "",
          jobType: jobData.job_type || "",
          salaryMin: jobData.min_salary?.toString() || "",
          salaryMax: jobData.max_salary?.toString() || "",
          currency: jobData.currency || "VND",
          skills: jobData.skills?.map((s: any) => s.name) || [],
          level: jobData.experience_level || "",
          deadline: jobData.closed_date || "",
          responsibilities: addBulletPoints(jobData.responsibilities || ""),
          basicRequirements: addBulletPoints(jobData.requirements || ""),
          preferredSkills: addBulletPoints(jobData.preferred_skills || ""),
          benefits: addBulletPoints(jobData.benefits || ""),
          interviewProcess: jobData.interview_process || [],
          description: jobData.description || "",
          visibility: jobData.visibility || "public",
          status:
            jobData.status === "published"
              ? "Published"
              : jobData.status === "draft"
                ? "Draft"
                : "Closed",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Cannot load job information");
        navigate(ROUTES.COMPANY.JOBS.LIST);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, isAuthenticated, user, navigate]);

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      // Đảm bảo jobType không bao giờ rỗng
      if (!data.jobType || data.jobType.trim() === "") {
        data.jobType = "full time";
      }

      // Log dữ liệu trước khi gửi (để debug)
      console.log("Submitting job data:", data);

      // Đảm bảo status đã được chuyển đổi đúng
      if (data.status === "Published") {
        console.log("Publishing job with status:", data.status);
      }

      await jobService.updateJob(id as string, data);

      if (data.status === "Published") {
        toast.success("Job has been updated and published!");
      } else {
        toast.success("Job has been saved as a draft!");
      }

      // Chuyển hướng đến trang danh sách job
      navigate(ROUTES.COMPANY.JOBS.LIST);
    } catch (error: any) {
      console.error("Error updating job:", error);

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
        toast.error(error.message || "Failed to update job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render action buttons
  const renderActionButtons = () => {
    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => {
            // Chuyển job sang DRAFT khi nhấn nút "Save as draft"
            form.setValue("status", "Draft");
            form.handleSubmit(onSubmit as SubmitHandler<any>)();
          }}
        >
          <Save className="mr-2 size-4" />
          Save as draft
        </Button>

        <Button
          type="button"
          disabled={isSubmitting}
          onClick={async () => {
            try {
              setIsSubmitting(true);

              // 1. Lưu các thay đổi của form với status "Draft" trước
              form.setValue("status", "Draft");
              await jobService.updateJob(id as string, form.getValues());

              // 2. Sau đó cập nhật status thành "published" bằng API riêng
              await jobService.updateJobStatus(id as string, "published");

              toast.success("Job has been updated and published!");
              navigate(ROUTES.COMPANY.JOBS.LIST);
            } catch (error: any) {
              console.error("Error publishing job:", error);
              toast.error(error.message || "Failed to publish job");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {isSubmitting ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <Send className="mr-2 size-4" />
          )}
          Update & Publish
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Edit job</h1>
      </div>

      <Tabs
        defaultValue="edit"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
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
                <Button variant="outline" onClick={() => setActiveTab("edit")}>
                  Back to edit
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

export default CompanyJobEditPage;
