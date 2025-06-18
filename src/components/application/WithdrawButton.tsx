import React, { useState } from "react";
import { applicationService } from "@/services/application";
import { CircleX } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface WithdrawButtonProps {
  applicationId: string;
  status: string;
  onWithdraw?: () => void;
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  applicationId,
  status,
  onWithdraw,
  variant = "destructive",
  size = "default",
  className = "",
  fullWidth = false,
  children,
}) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const canWithdraw = status === "pending";

  if (!canWithdraw) {
    return null;
  }

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);
      await applicationService.withdrawApplication(applicationId);
      toast.success("Application withdrawn successfully");
      if (onWithdraw) onWithdraw();
    } catch (error) {
      console.error("Error withdrawing application:", error);
      toast.error("Failed to withdraw application");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`${className} ${fullWidth ? "w-full" : ""}`}
          disabled={isWithdrawing}
        >
          {isWithdrawing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Withdrawing...
            </>
          ) : children ? (
            children
          ) : (
            <>
              <CircleX className="mr-2 h-4 w-4" />
              Withdraw Application
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently withdraw your application. You can apply again later if you change
            your mind.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleWithdraw}>Withdraw</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawButton;
