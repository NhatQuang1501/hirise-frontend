import React from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-3">
            <Mail className="size-6" />
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <a href="mailto:contact@hirise.com" className="text-primary hover:underline">
              contact@hirise.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-3">
            <Phone className="size-6" />
          </div>
          <div>
            <h3 className="font-medium">Phone</h3>
            <a href="tel:+84123456789" className="text-primary hover:underline">
              +84 123 456 789
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-3">
            <MapPin className="size-6" />
          </div>
          <div>
            <h3 className="font-medium">Office Address</h3>
            <p className="text-muted-foreground">
              54 Nguyen Luong Bang Street, Lien Chieu District
              <br />
              Da Nang, Viet Nam
            </p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-3">
            <Clock className="size-6" />
          </div>
          <div>
            <h3 className="font-medium">Office Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
