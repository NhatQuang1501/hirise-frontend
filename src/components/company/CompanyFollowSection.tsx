import { useEffect, useState } from "react";
import { companyService } from "@/services/company";
import { Star, Users } from "lucide-react";
import { toast } from "sonner";
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

interface CompanyFollowSectionProps {
  companyId: string;
  followersCount?: number;
  onFollowChange?: (isFollowing: boolean, newCount: number) => void;
  companyName?: string;
}

export function CompanyFollowSection({
  companyId,
  followersCount = 0,
  onFollowChange,
  companyName = "this company",
}: CompanyFollowSectionProps) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(followersCount);
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);

  useEffect(() => {
    if (user?.role === "applicant") {
      checkFollowStatus();
    }
  }, [companyId, user]);

  useEffect(() => {
    // Cập nhật count khi followersCount thay đổi
    setCount(followersCount);
  }, [followersCount]);

  const checkFollowStatus = async () => {
    try {
      setIsLoading(true);
      const response = await companyService.checkFollowStatus(companyId);
      setIsFollowing(response.is_following);
    } catch (error) {
      console.error("Failed to check follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    await followCompany();
  };

  const followCompany = async () => {
    try {
      setIsLoading(true);
      await companyService.followCompany(companyId);
      const newCount = count + 1;
      setCount(newCount);
      setIsFollowing(true);
      if (onFollowChange) {
        onFollowChange(true, newCount);
      }
    } catch (error) {
      console.error("Failed to follow company:", error);
      toast.error("Failed to follow company. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowCompany = async () => {
    try {
      setIsLoading(true);
      await companyService.unfollowCompany(companyId);
      const newCount = Math.max(0, count - 1);
      setCount(newCount);
      setIsFollowing(false);
      if (onFollowChange) {
        onFollowChange(false, newCount);
      }
    } catch (error) {
      console.error("Failed to unfollow company:", error);
      toast.error("Failed to unfollow company. Please try again.");
    } finally {
      setIsLoading(false);
      setShowUnfollowDialog(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Users className="h-4 w-4" />
        <span>{count} followers</span>
      </div>

      {user?.role === "applicant" && (
        <Button
          variant={isFollowing ? "default" : "outline"}
          size="sm"
          onClick={handleFollowToggle}
          disabled={isLoading}
          className={
            isFollowing
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
          }
        >
          <Star className={`mr-1 h-4 w-4 ${isFollowing ? "fill-white" : ""}`} />
          <span>{isFollowing ? "Following" : "Follow"}</span>
        </Button>
      )}

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
              onClick={unfollowCompany}
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              Unfollow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
