import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  return (
    <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "h-full"}`}>
      <div
        className={`border-primary animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default Loading;
