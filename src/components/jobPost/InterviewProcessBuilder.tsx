import React, { useState } from "react";
import { MoveDown, MoveUp, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="bg-muted/40 rounded-md p-6 text-center">
          <p className="text-muted-foreground">No interview steps added yet</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Add steps to describe your interview process
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
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
                  <MoveUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === steps.length - 1}
                  className="h-8 w-8"
                >
                  <MoveDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveStep(index)}
                  className="text-destructive hover:text-destructive h-8 w-8"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
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
          <PlusCircle className="mr-2 size-4" />
          Add Step
        </Button>
      </div>
    </div>
  );
};

export default InterviewProcessBuilder;
