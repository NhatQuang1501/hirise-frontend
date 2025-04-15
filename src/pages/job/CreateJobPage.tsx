import React, { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DEFAULT_JOB_FORM_VALUES, JobFormValues } from "@/types/job";
import JobFormBasicInfo from "@/components/jobPost/JobFormBasicInfo";
import JobFormDescription from "@/components/jobPost/JobFormDescription";
import JobFormDetails from "@/components/jobPost/JobFormDetails";
import JobFormPreview from "@/components/jobPost/JobFormPreview";
import JobFormSettings from "@/components/jobPost/JobFormSettings";
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

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");

  // Form setup with react-hook-form
  const form = useForm<JobFormValues>({
    defaultValues: DEFAULT_JOB_FORM_VALUES,
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);

    // For demo purposes, we'll check if they're trying to publish or save as draft
    if (data.status === "Published") {
      console.log("Publishing job...");
      alert("Job published successfully!");
    } else {
      console.log("Saving as draft...");
      alert("Job saved as draft!");
    }

    // Redirect to jobs list
    navigate(ROUTES.RECRUITER.JOBS.LIST);
  };

  // Render action buttons cho Create page
  const renderActionButtons = () => {
    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.setValue("status", "Draft");
            form.handleSubmit(onSubmit)();
          }}
        >
          <Save className="mr-2 size-4" />
          Save draft
        </Button>

        <Button
          type="button"
          onClick={() => {
            form.setValue("status", "Published");
            form.handleSubmit(onSubmit)();
          }}
        >
          <Send className="mr-2 size-4" />
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
          onClick={() => navigate(ROUTES.RECRUITER.JOBS.LIST)}
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
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <JobFormBasicInfo form={form} companies={mockCompanies} />
              <JobFormDetails form={form} />
              <JobFormDescription form={form} />
              <JobFormSettings form={form} />

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("preview")}
                >
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
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("create")}
                >
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

export default CreateJobPage;