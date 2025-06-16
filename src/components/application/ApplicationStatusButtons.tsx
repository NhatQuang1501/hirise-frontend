import React, { useState } from "react";
import { applicationService } from "@/services/application";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AcceptButtonProps {
  applicationId: string;
  onSuccess?: () => void;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export const AcceptButton: React.FC<AcceptButtonProps> = ({
  applicationId,
  onSuccess,
  disabled = false,
  size = "sm",
  variant = "outline",
  className = "border-green-500 text-green-500 hover:bg-green-50 hover:text-green-700",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await applicationService.acceptApplication(applicationId);
      toast.success("Application accepted successfully");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("Cannot accept application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        disabled={disabled || isLoading}
        className={className}
      >
        {isLoading ? (
          <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
        ) : (
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
        )}
        Accept
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Application Acceptance</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to accept this application? This action will notify the
              applicant that they have been accepted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleAccept();
              }}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Accept"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface RejectButtonProps {
  applicationId: string;
  onSuccess?: () => void;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export const RejectButton: React.FC<RejectButtonProps> = ({
  applicationId,
  onSuccess,
  disabled = false,
  size = "sm",
  variant = "outline",
  className = "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await applicationService.rejectApplication(applicationId);
      toast.success("Application rejected successfully");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Cannot reject application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        disabled={disabled || isLoading}
        className={className}
      >
        {isLoading ? (
          <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
        ) : (
          <XCircle className="mr-1 h-3.5 w-3.5" />
        )}
        Reject
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Application Rejection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this application? This action will notify the
              applicant that they have been rejected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleReject();
              }}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Reject"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface ApplicationStatusButtonsProps {
  applicationId: string;
  status: string;
  onStatusChange?: () => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export const ApplicationStatusButtons: React.FC<ApplicationStatusButtonsProps> = ({
  applicationId,
  status,
  onStatusChange,
  size = "sm",
  variant = "outline",
}) => {
  return (
    <div className="flex gap-2">
      <AcceptButton
        applicationId={applicationId}
        onSuccess={onStatusChange}
        disabled={status === "accepted"}
        size={size}
        variant={variant}
      />
      <RejectButton
        applicationId={applicationId}
        onSuccess={onStatusChange}
        disabled={status === "rejected"}
        size={size}
        variant={variant}
      />
    </div>
  );
};
