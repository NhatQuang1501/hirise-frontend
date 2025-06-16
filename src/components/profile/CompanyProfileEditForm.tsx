import { useEffect, useState } from "react";
import { profileService } from "@/services/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  Calendar,
  CirclePlus,
  Globe,
  Image,
  Loader2,
  MapPin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import QuillEditor from "@/components/jobPost/QuillEditor";
import { TagInput } from "@/components/profile/TagInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Invalid website URL").or(z.literal("")),
  description: z.string(),
  benefits: z.string(),
  founded_year: z.number().min(1900).max(new Date().getFullYear()).nullable(),
  skills: z.array(z.string()),
  locations: z.array(z.string()),
  industries: z.array(z.string()),
});

export function CompanyProfileEditForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
      benefits: "",
      founded_year: null,
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

        // Update form with data from API
        form.reset({
          name: data.profile?.name || "",
          website: data.profile?.website || "",
          description: data.profile?.description || "",
          benefits: data.profile?.benefits || "",
          founded_year: data.profile?.founded_year || null,
          skills: data.profile?.skill_names || [],
          locations: data.profile?.location_names || [],
          industries: data.profile?.industry_names || [],
        });

        // Save current logo URL
        if (data.profile?.logo) {
          setCurrentLogo(data.profile.logo);
        }
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file format
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      toast.error("Only image files are accepted (JPG, JPEG, PNG, GIF)");
      return;
    }

    // Check file size (max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size must not exceed 2MB");
      return;
    }

    // Update state and display preview
    setLogoFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setLogoPreview(objectUrl);
  };

  const onSubmit = async (data: z.infer<typeof companyProfileSchema>) => {
    try {
      setIsSubmitting(true);

      if (logoFile) {
        // Sử dụng FormData khi có file logo
        const formData = new FormData();

        // Thêm các trường dữ liệu thông thường
        formData.append("name", data.name);
        formData.append("website", data.website);
        formData.append("description", data.description);
        formData.append("benefits", data.benefits);

        // Chỉ thêm founded_year nếu có giá trị
        if (data.founded_year !== null) {
          formData.append("founded_year", data.founded_year.toString());
        }

        // Xử lý các mảng
        data.skills.forEach((item) => {
          formData.append("skills", item);
        });

        data.locations.forEach((item) => {
          formData.append("locations", item);
        });

        data.industries.forEach((item) => {
          formData.append("industries", item);
        });

        // Thêm file logo
        formData.append("logo", logoFile);

        await profileService.updateProfileWithLogo(user?.id, user?.role, formData);
      } else {
        // Sử dụng JSON khi không có file logo
        await profileService.updateProfile(user?.id, user?.role, data);
      }

      toast.success("Cập nhật hồ sơ thành công");
    } catch (error) {
      toast.error("Không thể cập nhật hồ sơ");
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
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-2.5">
            <Building2 className="text-primary size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Company Information</h2>
            <p className="text-muted-foreground text-sm">Update your company profile</p>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image className="text-muted-foreground size-4" />
            <h3 className="text-sm font-medium">Company Logo</h3>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="size-24 border">
              <AvatarImage src={logoPreview || currentLogo || undefined} alt="Company logo" />
              <AvatarFallback className="text-lg">
                {form.getValues("name")?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleLogoChange}
                className={cn(
                  "focus:border-primary w-full cursor-pointer border-dashed transition-all",
                  logoFile ? "border-green-400" : "hover:border-gray-400",
                )}
              />
              <p className="text-xs text-gray-500">
                Formats: JPG, JPEG, PNG, GIF. Maximum size: 2MB
              </p>
            </div>
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
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : null;
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
                  <QuillEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Describe your company..."
                    minHeight="200px"
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
                <FormLabel className="flex items-center gap-2">
                  <CirclePlus className="text-muted-foreground size-4" />
                  Benefits
                </FormLabel>
                <FormControl>
                  <QuillEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="List the benefits your company offers..."
                    minHeight="200px"
                  />
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

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
