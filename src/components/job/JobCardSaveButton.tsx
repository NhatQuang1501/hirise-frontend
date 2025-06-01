import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JobCardSaveButtonProps {
  saved: boolean;
  onSaveJob: (e: React.MouseEvent) => void;
}

const JobCardSaveButton: React.FC<JobCardSaveButtonProps> = ({ saved, onSaveJob }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Xử lý click vào nút save
  const handleSaveButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn không cho event lan truyền đến thẻ cha
    setIsDialogOpen(true);
  };

  // Xử lý khi người dùng xác nhận lưu/bỏ lưu job
  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(false);
    onSaveJob(e);
  };

  // Xử lý khi người dùng hủy
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSaveButtonClick}
        className={cn(
          "absolute top-2 right-2 z-10 rounded-full p-1.5 transition-colors hover:bg-gray-100",
          saved ? "text-rose-500" : "text-gray-400 hover:text-gray-600",
        )}
        aria-label={saved ? "Unsave job" : "Save job"}
      >
        <Bookmark className={cn("size-5", saved ? "fill-rose-500" : "")} />
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>{saved ? "Remove from saved jobs?" : "Save this job?"}</DialogTitle>
            <DialogDescription>
              {saved
                ? "This job will be removed from your saved jobs list."
                : "This job will be added to your saved jobs list for later viewing."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant={saved ? "destructive" : "secondary"} onClick={handleConfirm}>
              {saved ? "Remove" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCardSaveButton;
