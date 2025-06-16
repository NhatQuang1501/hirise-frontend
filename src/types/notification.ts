export type NotificationType =
  | "application"
  | "job"
  | "profile"
  | "system"
  | "success"
  | "error"
  | "message";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: NotificationType;
  link?: string;
}
