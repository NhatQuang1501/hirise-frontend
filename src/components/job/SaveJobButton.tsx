import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import SaveJobConfirmDialog from "@/components/popup/SaveJobConfirmDialog";
import { Button } from "@/components/ui/button";

interface SaveJobButtonProps {
  saved: boolean;
  onSaveJob: () => void;
  className?: string;
  variant?: "outline" | "ghost" | "icon";
  size?: "default" | "lg" | "sm" | "icon";
}

const SaveJobButton: React.FC<SaveJobButtonProps> = ({
  saved,
  onSaveJob,
  className = "",
  variant = "outline",
  size = "lg",
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền (quan trọng khi nút nằm trong card)
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    onSaveJob();
  };

  // Render nút icon cho JobCard
  if (variant === "icon") {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            saved ? "text-rose-500" : "text-gray-400 hover:text-gray-600"
          } ${className}`}
          onClick={handleOpenDialog}
          aria-label={saved ? "Unsave job" : "Save job"}
        >
          <Bookmark className={`size-5 ${saved ? "fill-rose-500" : ""}`} />
        </Button>

        <SaveJobConfirmDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          isSaved={saved}
          onConfirm={handleConfirm}
        />
      </>
    );
  }

  // Render nút thông thường
  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleOpenDialog}>
        {saved ? (
          <span className="flex items-center gap-2">
            <Bookmark className="fill-primary text-primary size-5" />
            Saved
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Bookmark className="size-5" />
            Save
          </span>
        )}
      </Button>

      <SaveJobConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        isSaved={saved}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default SaveJobButton;
