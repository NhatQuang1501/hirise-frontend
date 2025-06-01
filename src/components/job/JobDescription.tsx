import React from "react";
import { FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface JobDescriptionProps {
  description?: string; // Thêm dấu ? để cho phép undefined
  className?: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  description = "", // Thêm giá trị mặc định rỗng
  className,
}) => {
  // Kiểm tra xem mô tả có phải là HTML hay không
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(description);

  // Hàm chuyển đổi văn bản thuần thành định dạng hiển thị với các đoạn văn
  const formatPlainText = (text: string) => {
    return text.split("\n").map((paragraph, index) => {
      // Bỏ qua các dòng trống
      if (!paragraph.trim()) return null;

      // Kiểm tra xem đoạn có phải là bullet point không
      if (paragraph.trim().startsWith("-") || paragraph.trim().startsWith("•")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {paragraph.trim().substring(1).trim()}
          </li>
        );
      }

      return (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      );
    });
  };

  // Kiểm tra nếu không có mô tả
  if (!description || description.trim() === "" || description === "<p><br></p>") {
    return (
      <Alert className={cn("mb-6", className)}>
        <Info className="h-4 w-4" />
        <AlertTitle>No detailed description available</AlertTitle>
        <AlertDescription>
          The job poster hasn't provided a detailed description for this position. Please refer to
          the responsibilities and requirements sections for more information.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={cn("mb-6", className)}>
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <FileText className="text-primary h-5 w-5" />
        Description
      </h3>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {isHTML ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <div>{formatPlainText(description)}</div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
