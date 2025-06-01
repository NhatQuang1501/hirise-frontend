import React, { useEffect, useRef } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BulletTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const BulletTextarea: React.FC<BulletTextareaProps> = ({
  value,
  onChange,
  placeholder = "Enter bullet points, one per line...",
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addBulletPoint = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const currentValue = textareaRef.current.value;

      // Find the beginning of the current line
      let lineStart = start;
      while (lineStart > 0 && currentValue[lineStart - 1] !== "\n") {
        lineStart--;
      }

      // Check if the line already has a bullet
      const hasPrefix = currentValue.substring(lineStart, lineStart + 2) === "- ";

      // Insert bullet if needed
      if (!hasPrefix) {
        const newValue =
          currentValue.substring(0, lineStart) + "- " + currentValue.substring(lineStart);

        onChange(newValue);

        // Set cursor position after the bullet
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          }
        }, 0);
      }
    }
  };

  // Add bullet on press Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart;
        const currentValue = textareaRef.current.value;

        // Insert a new line with bullet
        const newValue = currentValue.substring(0, start) + "\n- " + currentValue.substring(start);

        onChange(newValue);

        // Set cursor position after the new bullet
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 3;
          }
        }, 0);
      }
    }
  };

  // Format on initial load
  useEffect(() => {
    if (value && !value.startsWith("- ")) {
      // If no bullets yet, add them to each line
      const formattedText = value
        .split("\n")
        .map((line) => (line.trim() ? (line.startsWith("- ") ? line : `- ${line}`) : line))
        .join("\n");

      if (formattedText !== value) {
        onChange(formattedText);
      }
    }
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addBulletPoint}
          className="h-8 px-2"
        >
          <List className="mr-1 h-4 w-4" />
          Add Bullet
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn("min-h-[150px]", className)}
      />
      <p className="text-muted-foreground text-sm">Press Enter to add a new bullet point</p>
    </div>
  );
};

export default BulletTextarea;
