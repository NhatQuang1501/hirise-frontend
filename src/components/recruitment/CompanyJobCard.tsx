import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/routes";
import { Building, Calendar, MapPin, Users } from "lucide-react";
import { CompanyJob, JobStatus } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CompanyJobCardProps {
  job: CompanyJob;
  onDelete: (id: string) => void;
  onClose: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onPublish?: (id: string) => void;
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

const CompanyJobCard: React.FC<CompanyJobCardProps> = ({
  job,
  onDelete,
  onClose,
  onView,
  onEdit,
  onPublish,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  // Kiểm tra xem job có phải của công ty đang đăng nhập không
  const isOwnJob = user?.id === job.companyId;

  const handleDelete = (id: string) => {
    setOpenMenu(false);
    onDelete(id);
  };

  const handleClose = (id: string) => {
    setOpenMenu(false);
    onClose(id);
  };

  const handlePublish = (id: string) => {
    setOpenMenu(false);
    if (onPublish) {
      onPublish(id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const handleViewJob = (e: React.MouseEvent) => {
    // Chỉ mở trang chi tiết nếu không phải click vào button
    if (!(e.target instanceof HTMLButtonElement)) {
      // Sử dụng ROUTES để có đường dẫn đúng
      window.open(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", job.id), "_blank");
    }
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
      onClick={handleViewJob}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="hover:text-primary text-lg font-semibold transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground text-sm">{job.company}</p>
              </div>
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            </div>

            <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="size-4" />
                <span>{job.city_display || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>Deadline: {formatDate(job.deadline)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-4" />
                <span>{job.applicationCount} Applicants</span>
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

          {isOwnJob && (
            <div className="flex flex-row items-center justify-center gap-2 border-t bg-gray-50 p-4 md:flex-col md:border-t-0 md:border-l md:py-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job.id);
                }}
                className="flex-1"
              >
                Edit
              </Button>

              <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1"
                  >
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  {job.status === "Draft" && onPublish && (
                    <DropdownMenuItem onClick={() => handlePublish(job.id)}>
                      Publish Job
                    </DropdownMenuItem>
                  )}
                  {job.status === "Published" && (
                    <DropdownMenuItem onClick={() => handleClose(job.id)}>
                      Close Job
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleDelete(job.id)} className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyJobCard;
