import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BulletListInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const BulletListInput: React.FC<BulletListInputProps> = ({
  value,
  onChange,
  placeholder = "Add item and press Enter",
}) => {
  // Parse the JSON string to array
  const [items, setItems] = useState<string[]>(() => {
    try {
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      // Convert array to JSON string for storage
      onChange(JSON.stringify(newItems));
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    // Convert array to JSON string for storage
    onChange(JSON.stringify(newItems));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" onClick={handleAddItem} size="sm">
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>

      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1.5">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(index)}
                className="ml-1 h-4 w-4 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default BulletListInput;
