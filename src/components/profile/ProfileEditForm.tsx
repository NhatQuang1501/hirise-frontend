import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building,
  Building2,
  Calendar,
  CirclePlus,
  FileUser,
  Globe,
  GraduationCap,
  Link as LinkIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Users2,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TagInput } from "@/components/profile/TagInput";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .optional(),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female", "other"]),
  city: z.string(),
  desiredPosition: z.string(),
  desiredLevels: z.array(z.string()),
  skills: z.array(z.string()),
  socialLinks: z
    .array(z.string().url("Invalid link format").or(z.literal("")))
    .optional()
    .default([]),
  cvLink: z.string().url("Invalid CV link format").or(z.literal("")).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
  onCancel: () => void;
}

const ProfileEditForm = ({ onSubmitSuccess, onSubmitError, onCancel }: ProfileEditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "user@example.com", // Disabled field
      phone: "",
      birthDate: "",
      gender: "male",
      city: "",
      desiredPosition: "",
      desiredLevels: [],
      skills: [],
      socialLinks: [""],
      cvLink: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // API call here
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      onSubmitError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-2.5">
              <User className="text-primary h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-muted-foreground text-sm">Your basic profile information</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="text-muted-foreground size-4" />
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="transition-all" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="text-muted-foreground size-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted/50" />
                  </FormControl>
                  <FormDescription className="text-xs italic">
                    Email cannot be changed
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="text-muted-foreground size-4" />
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="0123456789"
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground size-4" />
                    Date of birth
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="date" className="transition-all" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users2 className="text-muted-foreground size-4" />
                    Gender
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground size-4" />
                    City
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="hover:border-primary">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hanoi">Ha Noi</SelectItem>
                      <SelectItem value="hcm">Ho Chi Minh City</SelectItem>
                      <SelectItem value="danang">Da Nang</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Career Information */}
        <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-2.5">
              <Briefcase className="text-primary h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Career Information</h2>
              <p className="text-muted-foreground text-sm">
                Your professional preferences and skills
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="desiredPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building className="text-muted-foreground size-4" />
                    Desired position
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Frontend Developer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desiredLevels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="text-muted-foreground size-4" />
                    Desired levels
                  </FormLabel>
                  <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select levels" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="middle">Middle</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="flex items-center gap-2">
                    <GraduationCap className="text-muted-foreground size-4" />
                    Skills
                  </FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="React, PHP, AWS..."
                      tags={field.value}
                      className="sm:min-w-[400px]"
                      setTags={(newTags) => field.onChange(newTags)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Press Enter to add each skill
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Links */}
        <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-2.5">
              <Globe className="text-primary size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Online Presence</h2>
              <p className="text-muted-foreground text-sm">Your social profiles and CV</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="socialLinks"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="flex items-center gap-2">
                    <LinkIcon className="text-muted-foreground size-4" />
                    Social media links
                    <span className="text-muted-foreground text-sm">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {field.value.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="https://..."
                            value={link}
                            onChange={(e) => {
                              const newLinks = [...field.value];
                              newLinks[index] = e.target.value;
                              field.onChange(newLinks);
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newLinks = field.value.filter((_, i) => i !== index);
                              field.onChange(newLinks);
                            }}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/20"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => field.onChange([...field.value, ""])}
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-2 border-1 transition-colors"
                        size="sm"
                      >
                        <CirclePlus className="size-4" />
                        Add link
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Add your LinkedIn, GitHub, or other professional profiles
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvLink"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="flex items-center gap-2">
                    <FileUser className="text-muted-foreground size-4" />
                    CV link
                    <span className="text-muted-foreground text-sm">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://drive.google.com/..."
                      className="transition-all"
                    />
                  </FormControl>
                  <FormDescription>
                    Link to your CV on Google Drive, Dropbox, or other cloud storage
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 flex justify-end gap-4 py-4 backdrop-blur">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-w-[100px] border-gray-300 hover:bg-red-500/10 hover:text-red-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-secondary/90 min-w-[140px]"
          >
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isSubmitting ? "Saving changes..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
