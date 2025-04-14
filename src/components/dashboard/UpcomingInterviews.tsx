// File: hirise-frontend/src/components/dashboard/UpcomingInterviews.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface Interview {
  id: string;
  applicantName: string;
  position: string;
  date: string;
  time: string;
  type: string;
}

interface UpcomingInterviewsProps {
  interviews?: Interview[];
}

const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ 
  interviews = [
    {
      id: "1",
      applicantName: "John Smith",
      position: "Senior React Developer",
      date: new Date().toLocaleDateString(),
      time: "15:00 - 16:00",
      type: "Technical Interview"
    },
    {
      id: "2",
      applicantName: "Emily Brown",
      position: "Product Designer",
      date: new Date(Date.now() + 86400000).toLocaleDateString(), // tomorrow
      time: "09:30 - 10:30",
      type: "Design Challenge"
    }
  ]
}) => {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>Scheduled interviews for this week</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 size-4" />
          View Full Calendar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map(interview => (
            <div key={interview.id} className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-primary flex size-10 flex-shrink-0 items-center justify-center rounded-full font-semibold text-white">
                  {interview.date.split('/')[1] || new Date().getDate()}
                </div>
                <div>
                  <h4 className="font-medium">{interview.applicantName} - {interview.position}</h4>
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <span className="flex items-center">
                      <Clock className="mr-1 size-3.5" />
                      {interview.time}
                    </span>
                    <span>{interview.type}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2 sm:mt-0">
                <Button variant="outline" size="sm">Reschedule</Button>
                <Button size="sm">Join</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;