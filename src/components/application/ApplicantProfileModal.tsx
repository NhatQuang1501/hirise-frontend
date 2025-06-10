import React, { useEffect, useState } from "react";
import { profileService } from "@/services/profile";
import { format } from "date-fns";
import { Calendar, Info, Mail, Phone, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ApplicantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

export const ApplicantProfileModal: React.FC<ApplicantProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile || !profile.id) return;

      setLoading(true);
      try {
        const fullProfile = await profileService.getMyProfile(profile.id, "applicant");
        setProfileData(fullProfile);
      } catch (error) {
        console.error("Failed to fetch profile details:", error);
        // Fallback to basic profile if API fails
        setProfileData(profile);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && profile) {
      fetchProfile();
    }
  }, [isOpen, profile]);

  if (!profile) return null;

  // Fallback to the provided profile if API data isn't available
  const displayData = profileData || profile;
  const profileInfo = displayData.profile || displayData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl">Applicant Profile</span>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-5 py-4">
            {/* Basic Info */}
            <div>
              <h3 className="text-primary text-xl font-semibold">{profileInfo.full_name}</h3>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>{displayData.username}</span>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Contact Information
              </h4>

              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-4 w-4" />
                  <span>{displayData.email}</span>
                </div>

                {profileInfo.phone_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary h-4 w-4" />
                    <span>{profileInfo.phone_number}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="space-y-3">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Personal Information
              </h4>

              <div className="grid gap-3">
                {profileInfo.gender && (
                  <div className="flex items-start gap-3">
                    <User className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <span className="text-sm font-medium">Gender</span>
                      <p className="text-muted-foreground capitalize">{profileInfo.gender}</p>
                    </div>
                  </div>
                )}

                {profileInfo.date_of_birth && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <span className="text-sm font-medium">Date of Birth</span>
                      <p className="text-muted-foreground">
                        {format(new Date(profileInfo.date_of_birth), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About/Description */}
            {profileInfo.description && (
              <>
                <Separator />

                <div className="space-y-2">
                  <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
                    <Info className="h-4 w-4" />
                    About
                  </h4>
                  <p className="text-sm whitespace-pre-line">{profileInfo.description}</p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
