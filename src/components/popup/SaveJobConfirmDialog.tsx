import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveJobConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  isSaved: boolean;
  onConfirm: () => void;
}

const SaveJobConfirmDialog: React.FC<SaveJobConfirmDialogProps> = ({
  open,
  onClose,
  isSaved,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className={`size-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
            {isSaved ? "Remove from saved jobs" : "Save job"}
          </DialogTitle>
          <DialogDescription>
            {isSaved
              ? "Are you sure you want to remove this job from your saved jobs?"
              : "Save this job to your profile to apply later or track its status."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className={isSaved ? "bg-red-600 hover:bg-red-700" : ""}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {isSaved ? "Remove" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveJobConfirmDialog;
