import { useEffect, useState } from "react";
import jobService from "@/services/job";
import { toast } from "sonner";

interface UseSaveJobOptions {
  onSuccess?: () => void;
}

export const useSaveJob = (initialSavedState: boolean, options?: UseSaveJobOptions) => {
  const [isSaved, setIsSaved] = useState(initialSavedState);
  const [isLoading, setIsLoading] = useState(false);

  // Cập nhật isSaved khi initialSavedState thay đổi
  useEffect(() => {
    setIsSaved(initialSavedState);
  }, [initialSavedState]);

  const toggleSaveJob = async (jobId: string) => {
    setIsLoading(true);
    try {
      if (isSaved) {
        await jobService.unsaveJob(jobId);
        toast.success("Job removed from saved jobs");
        setIsSaved(false);
      } else {
        await jobService.saveJob(jobId);
        toast.success("Job saved successfully");
        setIsSaved(true);
      }

      // Gọi callback onSuccess nếu có
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSaved,
    isLoading,
    toggleSaveJob,
  };
};
