import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  suggestions?: string[];
}

const SkillsInput: React.FC<SkillsInputProps> = ({
  skills,
  onChange,
  suggestions = [
    "React", "Vue", "Angular", "JavaScript", "TypeScript", "Python",
    "Java", "C#", "Node.js", "Express", "Django", "Flask",
    "SQL", "NoSQL", "MongoDB", "PostgreSQL", "AWS", "Azure",
    "Docker", "Kubernetes", "Git", "CI/CD", "REST API", "GraphQL",
    "CSS", "HTML", "SASS", "LESS", "Tailwind CSS", "Bootstrap",
    "React Native", "Flutter", "iOS", "Android", "Swift", "Kotlin"
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
          !skills.includes(suggestion)
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
      <div className="flex flex-wrap gap-2 p-2 border border-input rounded-md min-h-[42px]">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-1 h-7">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="border-0 shadow-none h-7 px-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={skills.length === 0 ? "Add skills (e.g., React, Python)" : ""}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-md max-h-[200px] overflow-y-auto"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-muted text-sm"
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