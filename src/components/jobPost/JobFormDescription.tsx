import React from "react";
import { UseFormReturn } from "react-hook-form";
import BulletTextarea from "@/components/jobPost/BulletTextarea";
import InterviewProcessBuilder from "@/components/jobPost/InterviewProcessBuilder";
import QuillEditor from "@/components/jobPost/QuillEditor";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface JobFormDescriptionProps {
  form: UseFormReturn<any>;
}

const JobFormDescription: React.FC<JobFormDescriptionProps> = ({ form }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Detailed Description</h2>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <QuillEditor
                    placeholder="Provide a comprehensive description of the job..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Describe the role and what the candidate will do in this position.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsibilities"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Job Responsibilities</FormLabel>
                <FormControl>
                  <BulletTextarea
                    placeholder="- Develop backend features&#10;- Optimize system performance&#10;- Build and maintain APIs&#10;- Collaborate with frontend team"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>List the key responsibilities for this position.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Basic Requirements */}
          <FormField
            control={form.control}
            name="basicRequirements"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Basic Requirements</FormLabel>
                <FormControl>
                  <BulletTextarea
                    placeholder="- Minimum 2 years of experience&#10;- Good understanding of RESTful APIs&#10;- Experience with PostgreSQL/MySQL"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>List the essential requirements for the position.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Skills */}
          <FormField
            control={form.control}
            name="preferredSkills"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Preferred Skills (Nice to have)</FormLabel>
                <FormControl>
                  <BulletTextarea
                    placeholder="- Knowledge of Docker and CI/CD&#10;- Experience with Kubernetes&#10;- Familiar with Agile methodologies"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  List the preferred skills that would be a plus, but are not mandatory.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <BulletTextarea
                    placeholder="- Competitive salary&#10;- Dynamic working environment&#10;- Opportunities for learning and growth&#10;- Full insurance coverage"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  List the benefits your company offers for this position.
                </FormDescription>
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
                  Describe the interview process so candidates can prepare
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFormDescription;
