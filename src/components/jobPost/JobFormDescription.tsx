import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/jobPost/RichTextEditor";
import InterviewProcessBuilder from "@/components/jobPost/InterviewProcessBuilder";

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
            name="responsibilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Responsibilities</FormLabel>
                <FormControl>
                  <RichTextEditor
                    placeholder="Describe responsibilities for this position..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Basic Requirements</FormLabel>
                <FormControl>
                  <RichTextEditor
                    placeholder="List the basic requirements..."
                    value={field.value}
                    onChange={field.onChange}
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
                <FormLabel>Preferred Skills</FormLabel>
                <FormControl>
                  <RichTextEditor
                    placeholder="List the preferred skills..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <RichTextEditor
                    placeholder="Describe the benefits..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
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
                  <InterviewProcessBuilder
                    steps={field.value}
                    onChange={field.onChange}
                  />
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