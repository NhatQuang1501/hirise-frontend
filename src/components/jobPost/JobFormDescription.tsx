import React from "react";
import { UseFormReturn } from "react-hook-form";
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
            name="responsibilities"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Job Responsibilities</FormLabel>
                <FormControl>
                  <QuillEditor
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
              <FormItem className="space-y-2.5">
                <FormLabel>Basic Requirements</FormLabel>
                <FormControl>
                  <QuillEditor
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
              <FormItem className="space-y-2.5">
                <FormLabel>Preferred Skills</FormLabel>
                <FormControl>
                  <QuillEditor
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
              <FormItem className="space-y-2.5">
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <QuillEditor
                    placeholder="List the benefits..."
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
