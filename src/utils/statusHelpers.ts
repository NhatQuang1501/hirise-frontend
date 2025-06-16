// File: hirise-frontend/src/utils/statusHelpers.ts
export const getStatusColor = (status: string): string => {
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

export const getApplicantStatusColor = (status: string): string => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Reviewing":
      return "bg-yellow-100 text-yellow-800";
    case "Interviewed":
      return "bg-purple-100 text-purple-800";
    case "Offered":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
