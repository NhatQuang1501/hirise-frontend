import React, { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { JobStatus, RecruiterJob } from "@/types/recruiter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecruiterJobCardProps {
  job: RecruiterJob;
  onDelete: (id: number) => void;
  onClose: (id: number) => void;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}

const getStatusColor = (status: JobStatus): string => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-gray-100 text-gray-800";
    case "Closed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecruiterJobCard: React.FC<RecruiterJobCardProps> = ({
  job,
  onDelete,
  onClose,
  onView,
  onEdit,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleDelete = (id: number) => {
    setOpenMenu(false);
    onDelete(id);
  };

  const handleClose = (id: number) => {
    setOpenMenu(false);
    onClose(id);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            </div>

            <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>Created: {job.createdDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-4" />
                <span>{job.applicantCount} Applicants</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 border-t bg-gray-50 p-4 md:flex-col md:border-t-0 md:border-l md:py-2">
            <Button size="sm" variant="default" onClick={() => onView(job.id)} className="flex-1">
              View
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(job.id)} className="flex-1">
              Edit
            </Button>

            <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex-1">
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {job.status !== "Closed" && (
                  <DropdownMenuItem onClick={() => handleClose(job.id)}>Close Job</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => handleDelete(job.id)} className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecruiterJobCard;
