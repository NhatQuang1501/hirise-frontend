import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BenefitsSelectorProps {
  selectedBenefits: string[];
  onChange: (benefits: string[]) => void;
}

const BenefitsSelector: React.FC<BenefitsSelectorProps> = ({
  selectedBenefits,
  onChange,
}) => {
  const [customBenefit, setCustomBenefit] = useState("");
  const [customBenefits, setCustomBenefits] = useState<string[]>([]);

  const commonBenefits = [
    "Health insurance",
    "Dental insurance",
    "Vision insurance",
    "401(k) plan",
    "Paid time off",
    "Flexible working hours",
    "Remote work option",
    "Professional development",
    "Gym membership",
    "Free lunch/snacks",
    "Company events",
    "Parental leave",
  ];

  const handleToggleBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      onChange(selectedBenefits.filter((b) => b !== benefit));
    } else {
      onChange([...selectedBenefits, benefit]);
    }
  };

  const handleAddCustomBenefit = () => {
    if (customBenefit.trim() !== "" && !customBenefits.includes(customBenefit.trim())) {
      const newCustomBenefits = [...customBenefits, customBenefit.trim()];
      setCustomBenefits(newCustomBenefits);
      onChange([...selectedBenefits, customBenefit.trim()]);
      setCustomBenefit("");
    }
  };

  const handleRemoveCustomBenefit = (benefit: string) => {
    setCustomBenefits(customBenefits.filter((b) => b !== benefit));
    onChange(selectedBenefits.filter((b) => b !== benefit));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {commonBenefits.map((benefit) => (
          <div key={benefit} className="flex items-center space-x-2">
            <Checkbox
              id={`benefit-${benefit}`}
              checked={selectedBenefits.includes(benefit)}
              onCheckedChange={() => handleToggleBenefit(benefit)}
            />
            <Label htmlFor={`benefit-${benefit}`} className="cursor-pointer">
              {benefit}
            </Label>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Add custom benefits</p>
        <div className="flex gap-2">
          <Input
            placeholder="Enter a custom benefit"
            value={customBenefit}
            onChange={(e) => setCustomBenefit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomBenefit();
              }
            }}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddCustomBenefit} 
            size="sm" 
            variant="outline"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {customBenefits.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {customBenefits.map((benefit) => (
            <div
              key={benefit}
              className="bg-muted px-3 py-1 rounded-md text-sm flex items-center gap-1"
            >
              {benefit}
              <button
                type="button"
                onClick={() => handleRemoveCustomBenefit(benefit)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BenefitsSelector;