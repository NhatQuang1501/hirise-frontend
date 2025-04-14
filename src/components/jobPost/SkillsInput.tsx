import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { SkillsInputProps } from "@/types/interfaces";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const SkillsInput: React.FC<SkillsInputProps> = ({
  skills,
  onChange,
  suggestions = [
    "React",
    "Vue",
    "Angular",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "SQL",
    "NoSQL",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "REST API",
    "GraphQL",
    "CSS",
    "HTML",
    "SASS",
    "LESS",
    "Tailwind CSS",
    "Bootstrap",
    "React Native",
    "Flutter",
    "iOS",
    "Android",
    "Swift",
    "Kotlin",
  ],
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions when input changes
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !skills.includes(suggestion),
      )
      .slice(0, 6); // Limit to 6 suggestions

    setFilteredSuggestions(filtered);
  }, [inputValue, skills, suggestions]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  };

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (
      trimmedSkill !== "" &&
      !skills.find((s) => s.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      onChange([...skills, trimmedSkill]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    onChange(newSkills);
  };

  const selectSuggestion = (suggestion: string) => {
    addSkill(suggestion);
  };

  return (
    <div className="w-full">
      <div className="border-input flex min-h-[42px] flex-wrap gap-2 rounded-md border p-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="h-7 px-2 py-1">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-muted-foreground hover:text-foreground ml-1"
            >
              <X className="size-3 text-white" />
            </button>
          </Badge>
        ))}
        <div className="relative min-w-[120px] flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="h-7 border-0 px-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={skills.length === 0 ? "Add skills (e.g., React, Python)" : ""}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="bg-background border-input absolute z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded-md border shadow-md"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsInput;
