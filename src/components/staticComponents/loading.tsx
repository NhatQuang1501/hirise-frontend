import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
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
