import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface BulletListEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

// Define custom toolbar with limited formatting options
const modules = {
  toolbar: [["bold", "italic"], [{ list: "bullet" }], ["clean"]],
  clipboard: {
    matchVisual: false,
  },
};

const formats = ["bold", "italic", "list", "bullet"];

const BulletListEditor: React.FC<BulletListEditorProps> = ({
  value,
  onChange,
  placeholder,
  minHeight = "150px",
  className,
}) => {
  return (
    <div className={cn("border-input bg-background rounded-md border", className)}>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        style={{ minHeight }}
      />
    </div>
  );
};

export default BulletListEditor;
