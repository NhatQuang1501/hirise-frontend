import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, MoveUp, MoveDown } from "lucide-react";

interface InterviewProcessBuilderProps {
  steps: string[];
  onChange: (steps: string[]) => void;
}

const InterviewProcessBuilder: React.FC<InterviewProcessBuilderProps> = ({ steps, onChange }) => {
  const [newStep, setNewStep] = useState("");

  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      onChange([...steps, newStep.trim()]);
      setNewStep("");
    }
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    onChange(newSteps);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    onChange(newSteps);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    onChange(newSteps);
  };

  const handleUpdateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    onChange(newSteps);
  };

  return (
    <div className="space-y-4">
      {steps.length === 0 ? (
        <div className="bg-muted/40 p-6 text-center rounded-md">
          <p className="text-muted-foreground">No interview steps added yet</p>
          <p className="text-xs text-muted-foreground mt-1">Add steps to describe your interview process</p>
        </div>
      ) : (
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-muted flex items-center justify-center w-8 h-8 rounded-full shrink-0">
                {index + 1}
              </div>
              <Input
                value={step}
                onChange={(e) => handleUpdateStep(index, e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8"
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === steps.length - 1}
                  className="h-8 w-8"
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveStep(index)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Add new interview step"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddStep();
            }
          }}
          className="flex-1"
        />
        <Button type="button" onClick={handleAddStep} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Step
        </Button>
      </div>
    </div>
  );
};

export default InterviewProcessBuilder;