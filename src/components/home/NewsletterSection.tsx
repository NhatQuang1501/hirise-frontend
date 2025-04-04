import React from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-primary py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-4 h-12 w-12" aria-hidden="true" />
          <h2 className="mb-3 text-3xl font-bold">Receive job offers via email</h2>
          <p className="mb-6">
            Register to receive the latest IT job opportunities tailored to your skills.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 placeholder:text-white/70"
              aria-label="Email address"
            />
            <Button variant="secondary" className="flex items-center gap-2">
              <Send className="h-4 w-4" aria-hidden="true" />
              Register now
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <input type="checkbox" id="consent" className="h-4 w-4" aria-label="Consent checkbox" />
            <label htmlFor="consent" className="text-sm">
              I agree to receive job offers from HiRise
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
