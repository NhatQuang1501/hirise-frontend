import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
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

interface FollowButtonProps {
  companyId: string;
  companyName?: string;
  isFollowing: boolean;
  isLoading?: boolean;
  onFollow: () => Promise<void>;
  onUnfollow: () => Promise<void>;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showToast?: boolean;
}

export function FollowButton({
  companyName = "this company",
  isFollowing,
  isLoading = false,
  onFollow,
  onUnfollow,
  variant = "ghost",
  size = "sm",
  className,
  showToast = false,
}: FollowButtonProps) {
  const { user } = useAuth();
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleFollowToggle = async () => {
    if (user?.role !== "applicant") {
      toast.error("Only applicants can follow companies");
      return;
    }

    // Nếu đang follow, hiển thị dialog xác nhận unfollow
    if (isFollowing) {
      setShowUnfollowDialog(true);
      return;
    }

    // Nếu chưa follow, thực hiện follow luôn
    setLocalLoading(true);
    try {
      await onFollow();
      if (showToast) {
        toast.success("Company followed");
      }
    } catch (error) {
      // Chỉ hiển thị toast lỗi một lần
      if (showToast) {
        toast.error("Failed to follow company. Please try again.");
      }
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setLocalLoading(true);
    try {
      await onUnfollow();
      if (showToast) {
        toast.success("Company unfollowed");
      }
    } catch (error) {
      // Chỉ hiển thị toast lỗi một lần
      if (showToast) {
        toast.error("Failed to unfollow company. Please try again.");
      }
      console.error(error);
    } finally {
      setLocalLoading(false);
      setShowUnfollowDialog(false);
    }
  };

  if (user?.role !== "applicant") {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleFollowToggle}
        disabled={isLoading || localLoading}
        className={cn(
          "group transition-all duration-300",
          isFollowing
            ? "bg-amber-500 text-white hover:bg-amber-600"
            : "border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700",
          className,
        )}
      >
        <Star className={cn("mr-1 h-4 w-4 transition-all", isFollowing ? "fill-white" : "")} />
        <span>{isFollowing ? "Following" : "Follow"}</span>
      </Button>

      {/* Dialog xác nhận unfollow */}
      <AlertDialog open={showUnfollowDialog} onOpenChange={setShowUnfollowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unfollow Company</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unfollow {companyName}? You will no longer receive updates
              about their job postings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUnfollow}
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              Unfollow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
