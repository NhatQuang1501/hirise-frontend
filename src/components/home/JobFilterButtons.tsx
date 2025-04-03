import React from "react";
import { Button } from "@/components/ui/button";

const JobFilterButtons: React.FC = () => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Button variant="outline" className="hover:text-primary rounded-full">
        Tất cả
      </Button>
      <Button variant="outline" className="hover:text-primary rounded-full">
        Việc mới nhất
      </Button>
      <Button variant="outline" className="hover:text-primary rounded-full">
        Remote
      </Button>
      <Button variant="outline" className="hover:text-primary rounded-full">
        Freelance
      </Button>
    </div>
  );
};

export default JobFilterButtons;