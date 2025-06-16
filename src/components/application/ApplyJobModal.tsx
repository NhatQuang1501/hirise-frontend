import React, { useState } from "react";
import { applicationService } from "@/services/application";
import { AlertCircle, CheckCircle2, FileText, Info, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ isOpen, onClose, jobId, jobTitle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Kiểm tra định dạng file
    const validExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      setFile(null);
      return;
    }

    // Kiểm tra kích thước file (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a CV file to upload.");
      return;
    }

    try {
      setIsSubmitting(true);
      await applicationService.applyForJob(jobId, file);
      toast.success("Application submitted successfully!");
      onClose();
    } catch (error: any) {
      console.error("Error applying for job:", error);
      setError(error.response?.data?.detail || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-bold">
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Submit your application for this position
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive" className="animate-fadeIn">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Alert className="border-blue-200 bg-blue-50 shadow-sm">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-primary text-sm font-medium">
              In addition to your uploaded CV, your profile information will be included in this
              application. Please review your profile before applying.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label htmlFor="cv-file" className="text-sm font-medium">
              Upload your CV
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  id="cv-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={cn(
                    "focus:border-primary cursor-pointer border-dashed transition-all",
                    file ? "border-green-400" : "hover:border-gray-400",
                  )}
                />
              </div>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <CheckCircle2 className="h-3 w-3 text-gray-400" />
              Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB.
            </p>
          </div>

          {file && (
            <div className="animate-fadeIn flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 shadow-sm">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="truncate text-sm font-medium text-green-700">{file.name}</span>
              <span className="ml-auto text-xs text-green-600">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!file || isSubmitting}
              className="gap-2 transition-all"
              variant="secondary"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
