import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Eye, FileText, Save, Send, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BenefitsSelector from "@/components/jobPost/BenefitsSelector";
import InterviewProcessBuilder from "@/components/jobPost/InterviewProcessBuilder";
import RichTextEditor from "@/components/jobPost/RichTextEditor";
import SkillsInput from "@/components/jobPost/SkillsInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form schema with Zod
const postJobSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  companyId: z.string().min(1, "Please select a company"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  currency: z.string().default("USD"),
  jobType: z.string().min(1, "Please select a job type"),
  jobLevel: z.string().min(1, "Please select a job level"),
  experience: z.string().min(1, "Please select years of experience"),
  responsibilities: z.string().min(50, "Please provide detailed responsibilities"),
  requirements: z.string().min(50, "Please provide detailed requirements"),
  preferredSkills: z.string().optional(),
  // benefits: z.array(z.string()),
  benefits: z.string().min(1, "Please provide some benefits information"),
  howtoapply: z.string().min(1, "Please specify how to apply"),
  interviewProcess: z.array(z.string()),
  deadline: z.string().optional(),
  visibility: z.string().default("public"),
  openings: z.string().min(1, "Please specify number of openings"),
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  attachment: z.instanceof(File).optional(),
});

type PostJobFormValues = z.infer<typeof postJobSchema>;

// Mock companies for testing
const mockCompanies = [
  { id: "1", name: "Acme Inc." },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Stark Industries" },
];

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [autosaveInterval, setAutosaveInterval] = useState<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [navigationPath, setNavigationPath] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize form with default values
  const form = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      companyId: mockCompanies[0]?.id || "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      currency: "VND",
      jobType: "",
      jobLevel: "",
      experience: "",
      responsibilities: "",
      requirements: "",
      preferredSkills: "",
      benefits: [],
      howtoapply: "",
      interviewProcess: [],
      deadline: "",
      visibility: "public",
      openings: "1",
      skills: [],
    },
  });

  // Load draft from localStorage when component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem("jobPostDraft");
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        // Exclude file attachment when loading from localStorage
        const { attachment: _, ...rest } = draftData;
        form.reset(rest);
        console.info("Draft loaded successfully");
      } catch (error) {
        console.error("Error loading draft:", error);
        console.error("Failed to load draft");
      }
    }
  }, [form]);

  // Set up autosave
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty) {
        saveFormData(true);
      }
    }, 60000); // Autosave every 60 seconds if form is dirty

    setAutosaveInterval(interval);

    return () => {
      if (autosaveInterval) {
        clearInterval(autosaveInterval);
      }
    };
  }, [isDirty]);

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsDirty(true);
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  // Handle navigation prompt
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // Save form data to localStorage
  const saveFormData = (isAutoSave = false) => {
    try {
      const formData = form.getValues();
      const dataToSave = { ...formData, attachment: undefined }; // Don't save file in localStorage
      localStorage.setItem("jobPostDraft", JSON.stringify(dataToSave));
      setLastSaved(new Date());
      setIsDirty(false);

      if (!isAutoSave) {
        console.log("Draft saved successfully");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      if (!isAutoSave) {
        console.error("Failed to save draft");
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data: PostJobFormValues) => {
    try {
      console.log("Submitting job post:", data);

      // This would be replaced with an actual API call
      // await postJobAPI(data);

      // Clear draft after successful submission
      localStorage.removeItem("jobPostDraft");

      console.log("Job posted successfully!");
      navigate("/employer/jobs");
    } catch (error) {
      console.error("Error posting job:", error);
      console.error("Failed to post job. Please try again.");
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        console.error("Only PDF files are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        console.error("File size should not exceed 5MB");
        return;
      }

      form.setValue("attachment", file, { shouldDirty: true });
      console.log(`File "${file.name}" uploaded successfully`);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <p className="text-muted-foreground text-sm">
              Last saved: {lastSaved.toLocaleTimeString()}
            </p>
          )}
          <Button variant="outline" size="sm" onClick={() => saveFormData()}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="default" size="sm" onClick={form.handleSubmit(onSubmit)}>
            <Send className="mr-2 h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>

      {isDirty && (
        <Alert className="mb-6">
          <AlertTriangle className="size-4" />
          <AlertTitle>Unsaved changes</AlertTitle>
          <AlertDescription>
            You have unsaved changes. Make sure to save your draft or post the job before leaving
            this page.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <FileText className="text-primary size-5" />
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior React Developer" {...field} />
                        </FormControl>
                        <FormDescription>
                          Be specific to attract the right candidates
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockCompanies.map((company) => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. New York, NY or Remote" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="salaryMin"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Range (Min)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Min" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salaryMax"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Range (Max)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Max" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="VND">VND - Vietnamese Dong</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Level*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="intern">Intern</SelectItem>
                            <SelectItem value="fresher">Fresher</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="middle">Middle</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="lead">Team Lead</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-7">5-7 years</SelectItem>
                            <SelectItem value="7-10">7-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="openings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Openings*</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <FileText className="text-primary h-5 w-5" />
                  Job Description
                </h2>

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities*</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Describe the day-to-day responsibilities of this position..."
                          minHeight="200px"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a clear description of what the candidate will be doing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Basic Requirements*</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="List the essential qualifications, skills, and experience..."
                          minHeight="200px"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Skills (Optional)</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="List any additional skills or experience that would be nice to have..."
                          minHeight="200px"
                        />
                      </FormControl>
                      <FormDescription>
                        Not required, but would give candidates an advantage
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits</FormLabel>
                      <FormControl>
                        <BenefitsSelector
                          selectedBenefits={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the benefits offered with this position
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits & Perks*</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Describe the benefits and perks offered with this position (e.g. Healthcare coverage, Annual leave policy, Training opportunities...)."
                          minHeight="200px"
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific about what you offer to attract the best candidates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills & Technologies*</FormLabel>
                      <FormControl>
                        <SkillsInput skills={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>
                        These will be used to help candidates find your job posting
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <FileText className="text-primary h-5 w-5" />
                  Application Process
                </h2>

                <FormField
                  control={form.control}
                  name="howtoapply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How to Apply*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Email your resume to hr@company.com" {...field} />
                      </FormControl>
                      <FormDescription>Provide clear instructions on how to apply</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interviewProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Process</FormLabel>
                      <FormControl>
                        <InterviewProcessBuilder steps={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>
                        Let candidates know what to expect during the hiring process
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Deadline</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Leave blank if there's no deadline</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <FileText className="text-primary h-5 w-5" />
                  Additional Settings
                </h2>

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to everyone</SelectItem>
                          <SelectItem value="private">
                            Private - Visible only with direct link
                          </SelectItem>
                          <SelectItem value="unlisted">
                            Unlisted - Not shown in search results
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Control who can see your job posting</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel htmlFor="attachment">Attach JD PDF (Optional)</FormLabel>
                  <div className="mt-2">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("attachment")?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload PDF
                      </Button>
                      <input
                        id="attachment"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      {form.watch("attachment") && (
                        <div className="bg-muted flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                          <FileText className="h-4 w-4" />
                          {(form.watch("attachment") as File).name}
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => form.setValue("attachment", undefined)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Max file size: 5MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => saveFormData()}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Post Job
            </Button>
          </div>
        </form>
      </Form>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Job Preview</DialogTitle>
            <DialogDescription>
              Preview how your job posting will appear to candidates
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{form.watch("title") || "Job Title"}</h2>
              <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
                <div className="flex items-center gap-1">
                  {mockCompanies.find((c) => c.id === form.watch("companyId"))?.name || "Company"}
                </div>
                <div>•</div>
                <div>{form.watch("location") || "Location"}</div>
                <div>•</div>
                <div>
                  {form.watch("salaryMin") && form.watch("salaryMax")
                    ? `${form.watch("salaryMin")}-${form.watch("salaryMax")} ${form.watch("currency")}`
                    : "Salary not specified"}
                </div>
              </div>
            </div>

            <div className="my-4 flex flex-wrap gap-2">
              {form.watch("skills").map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <Tabs defaultValue="description">
              <TabsList className="mb-4 grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="company">Company & Benefits</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Responsibilities</h3>
                  <div
                    className="prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: form.watch("responsibilities") || "No responsibilities specified",
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="requirements" className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Basic Requirements</h3>
                  <div
                    className="prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: form.watch("requirements") || "No requirements specified",
                    }}
                  />
                </div>
                {form.watch("preferredSkills") && (
                  <div>
                    <h3 className="mb-2 font-semibold">Preferred Skills</h3>
                    <div
                      className="prose max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: form.watch("preferredSkills") ?? "" }}
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="company" className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Benefits & Perks</h3>
                  <div
                    className="prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: form.watch("benefits") || "No benefits specified",
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-muted mt-6 rounded-md p-4">
              <h3 className="mb-2 font-semibold">How to Apply</h3>
              <p>{form.watch("howtoapply") || "Application instructions not provided"}</p>

              {form.watch("interviewProcess").length > 0 && (
                <div className="mt-4">
                  <h3 className="mb-2 font-semibold">Interview Process</h3>
                  <ol className="list-decimal space-y-1 pl-5">
                    {form.watch("interviewProcess").map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {form.watch("deadline") && (
                <div className="mt-4">
                  <h3 className="font-semibold">Application Deadline</h3>
                  <p>{new Date(form.watch("deadline")).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave confirmation dialog */}
      <Dialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave this page?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLeaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setLeaveDialogOpen(false);
                navigate(navigationPath);
              }}
            >
              Leave without saving
            </Button>
            <Button
              onClick={() => {
                saveFormData();
                setLeaveDialogOpen(false);
                navigate(navigationPath);
              }}
            >
              Save and leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostJobPage;
