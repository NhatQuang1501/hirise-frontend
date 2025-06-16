import React from "react";
import { Button } from "@/components/ui/button";

interface JobFilterButtonsProps {
  onFilter?: (filter: string) => void;
  activeFilter?: string;
}

const JobFilterButtons: React.FC<JobFilterButtonsProps> = ({
  onFilter = () => {},
  activeFilter = "all",
}) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "latest", label: "Latest" },
    { id: "remote", label: "Remote" },
    { id: "freelance", label: "Freelance" },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          className={`rounded-full ${activeFilter !== filter.id ? "hover:text-primary" : ""}`}
          onClick={() => onFilter(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default JobFilterButtons;
