import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveJobButtonProps {
  saved: boolean;
  onSaveJob: () => void;
  className?: string;
}

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ saved, onSaveJob, className = "" }) => {
  return (
    <Button variant="outline" size="lg" className={className} onClick={onSaveJob}>
      {saved ? (
        <span className="flex items-center gap-2">
          <Heart className="fill-primary text-primary size-5" />
          Saved
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Heart className="size-5" />
          Save
        </span>
      )}
    </Button>
  );
};

export default SaveJobButton;
