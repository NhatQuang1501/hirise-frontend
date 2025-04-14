import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Save, Send, Eye } from "lucide-react";
import { ROUTES } from "@/routes/routes"

// Import shared components
import JobFormBasicInfo from "@/components/jobPost/JobFormBasicInfo";
import JobFormDetails from "@/components/jobPost/JobFormDetails";
import JobFormDescription from "@/components/jobPost/JobFormDescription";
import JobFormSettings from "@/components/jobPost/JobFormSettings";
import JobFormPreview from "@/components/jobPost/JobFormPreview";

// Sample data for companies
const mockCompanies = [
  { id: "1", name: "FPT Software" },
  { id: "2", name: "VNG Corporation" },
  { id: "3", name: "Tiki" },
  { id: "4", name: "Shopee" },
];

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit");
  
  // Form setup with react-hook-form
  const form = useForm({
    defaultValues: {
      title: "",
      companyId: "",
      location: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
      currency: "VND",
      skills: [],
      level: "",
      experience: "",
      deadline: "",
      responsibilities: [],
      basicRequirements: [],
      preferredSkills: [],
      benefits: [],
      interviewProcess: [],
      description: "",
      visibility: "public",
      status: "Draft",
    }
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

  // Action buttons based on current form values
  const renderActionButtons = () => {
    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Save as draft
            form.setValue("status", "Draft");
            form.handleSubmit(onSubmit)();
          }}
        >
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
        
        <Button 
          type="button"
          onClick={() => {
            // Publish immediately
            form.setValue("status", "Published");
            form.handleSubmit(onSubmit)();
          }}
        >
          <Send className="mr-2 h-4 w-4" />
          Publish Now
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Create New Job</h1>
      
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
            
            <div className="border-t bg-muted/50 p-4">
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

export default CreateJobPage;