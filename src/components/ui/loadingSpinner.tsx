import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="container mx-auto flex h-96 items-center justify-center px-4">
      <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;