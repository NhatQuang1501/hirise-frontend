import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFormBasicInfoProps {
  form: UseFormReturn<any>;
  companies?: { id: string; name: string }[];
}

const JobFormBasicInfo: React.FC<JobFormBasicInfoProps> = ({ form }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Basic Information</h2>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hanoi">Ha Noi</SelectItem>
                    <SelectItem value="hochiminh">Ho Chi Minh</SelectItem>
                    <SelectItem value="danang">Da Nang</SelectItem>
                    <SelectItem value="hue">Hue</SelectItem>
                    <SelectItem value="cantho">Can Tho</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
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
                  <Input
                    placeholder="e.g. 4th Floor, E.Town 1, 364 Cong Hoa, Tan Binh, HCMC"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="salaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Salary</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salaryMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Salary</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="VND">VND</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFormBasicInfo;
