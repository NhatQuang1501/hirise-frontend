import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Company Dashboard</h1>
      <p className="text-muted-foreground mt-1">Manage your jobs and applicants</p>
    </div>
  );
};

export default DashboardHeader;
