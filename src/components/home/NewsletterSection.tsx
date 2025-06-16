import React from "react";
import { Bell, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection: React.FC = () => {
  return (
    <section className="from-secondary to-primary relative bg-gradient-to-r py-16 text-white">
      {/* Abstract shapes decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="bg-accent absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl"></div>
        <div className="bg-primary-foreground absolute top-40 right-10 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-white/30 bg-white/10 px-4 py-1 text-white"
          >
            <Bell className="mr-1 size-4" /> Stay Updated
          </Badge>

          <h2 className="mb-6 text-3xl font-bold">Get Job Alerts Delivered to Your Inbox</h2>
          <p className="text-primary-foreground mb-8 text-lg">
            Subscribe to receive personalized job recommendations tailored to your skills and
            preferences
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border-white/20 bg-white/10 placeholder:text-white/70 focus:border-white"
              aria-label="Email address"
            />
            <Button className="text-primary hover:bg-primary-foreground flex items-center gap-2 bg-white">
              <Send className="size-4" aria-hidden="true" />
              Subscribe
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="consent"
              className="size-4 accent-white/70"
              aria-label="Consent checkbox"
            />
            <label htmlFor="consent" className="text-sm text-white/80">
              I agree to receive job alerts and career tips from HiRise
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
