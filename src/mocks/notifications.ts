import { Notification } from "@/types/notification";

// Mock notification data for development
export const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Your application for Frontend Developer at Google has been viewed",
    read: false,
    createdAt: new Date().toISOString(),
    type: "application",
    link: "/applications/1",
  },
  {
    id: "2",
    message: "New job matching your preferences: Senior React Developer",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    type: "job",
    link: "/jobs/2",
  },
  {
    id: "3",
    message: "Your profile has been updated successfully",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    type: "profile",
    link: "/profile",
  },
  {
    id: "4",
    message: "Your application for Data Scientist at Amazon has been rejected",
    read: true,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    type: "application",
    link: "/applications/5",
  },
  {
    id: "5",
    message: "Welcome to HiRise! Complete your profile to get started",
    read: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    type: "system",
    link: "/profile",
  },
  {
    id: "6",
    message: "New message from HR Manager at Microsoft",
    read: true,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    type: "message",
    link: "/messages/6",
  },
  {
    id: "7",
    message: "Congratulations! Your application has been shortlisted",
    read: false,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    type: "success",
    link: "/applications/7",
  },
  {
    id: "8",
    message: "There was an error processing your application",
    read: true,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    type: "error",
    link: "/applications/8",
  },
  {
    id: "9",
    message: "New job recommendations available based on your profile",
    read: false,
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    type: "job",
    link: "/jobs/recommendations",
  },
  {
    id: "10",
    message: "Your resume has been downloaded by a recruiter",
    read: true,
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    type: "profile",
    link: "/profile/views",
  },
];
