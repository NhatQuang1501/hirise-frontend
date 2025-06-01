import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building2, Calendar, CirclePlus, Globe, Loader2, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TagInput } from "@/components/profile/TagInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Invalid website URL").or(z.literal("")),
  description: z.string(),
  benefits: z.string(),
  founded_year: z.number().min(1900).max(new Date().getFullYear()),
  skills: z.array(z.string()),
  locations: z.array(z.string()),
  industries: z.array(z.string()),
});

// type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;

// interface CompanyProfileEditFormProps {
//   initialData?: any;
//   onSubmitSuccess?: () => void;
// }

export function CompanyProfileEditForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
      benefits: "",
      founded_year: new Date().getFullYear(),
      skills: [],
      locations: [],
      industries: [],
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await profileService.getMyProfile(user?.id, user?.role);

        // Cập nhật form với dữ liệu từ API
        form.reset({
          name: data.profile?.name || "",
          website: data.profile?.website || "",
          description: data.profile?.description || "",
          benefits: data.profile?.benefits || "",
          founded_year: data.profile?.founded_year || new Date().getFullYear(),
          skills: data.profile?.skill_names || [],
          locations: data.profile?.location_names || [],
          industries: data.profile?.industry_names || [],
        });
      } catch (error) {
        toast.error("Failed to load profile");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      loadProfile();
    }
  }, [user?.id, form]);

  const onSubmit = async (data: z.infer<typeof companyProfileSchema>) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting data:", data);
      await profileService.updateProfile(user?.id, user?.role, data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto max-w-3xl space-y-8 px-4 py-8"
      >
        {/* <div className="bg-card rounded-xl border p-6 shadow-sm"> */}
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-2.5">
            <Building2 className="text-primary size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Company Information</h2>
            <p className="text-muted-foreground text-sm">Update your company profile</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="text-muted-foreground size-4" />
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="text-muted-foreground size-4" />
                  Website
                </FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="founded_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground size-4" />
                  Founded Year
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseInt(e.target.value)
                        : new Date().getFullYear();
                      field.onChange(value);
                    }}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="text-muted-foreground size-4" />
                  Company Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
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
                <FormLabel className="flex items-center gap-2">
                  <CirclePlus className="text-muted-foreground size-4" />
                  Benefits
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="text-muted-foreground size-4" />
                  Technologies & Skills
                </FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add skills..."
                    tags={field.value}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locations"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground size-4" />
                  Locations
                </FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add locations..."
                    tags={field.value}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industries"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="text-muted-foreground size-4" />
                  Industries
                </FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add industries..."
                    tags={field.value}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* </div> */}

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
