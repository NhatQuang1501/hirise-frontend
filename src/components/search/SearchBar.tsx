import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = "" }) => {
  const [keyword, setKeyword] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Mô phỏng gợi ý từ khóa
  const dummySuggestions = [
    "React Developer",
    "Frontend Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    // Mô phỏng autocomplete
    if (value.length > 1) {
      const filtered = dummySuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    onSearch(keyword);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for jobs, companies, skills..."
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="h-12 pr-10 pl-10 text-base"
            />
            <Search className="text-primary absolute top-1/2 left-3 size-5 -translate-y-1/2" />

            {/* Autocomplete suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-white py-1 shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button onClick={handleSearch} className="h-12 px-6 text-base">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
