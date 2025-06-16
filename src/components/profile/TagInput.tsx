import { X } from "lucide-react";
import { TagInputProps } from "@/types/interfaces";
import { Input } from "@/components/ui/input";

export const TagInput = ({ placeholder, tags, setTags, className }: TagInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-primary/20 rounded-full p-1"
            >
              <X className="size-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </span>
        ))}
      </div>
      <Input type="text" placeholder={placeholder} onKeyDown={handleKeyPress} className="mt-2" />
    </div>
  );
};
