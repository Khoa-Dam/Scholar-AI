"use client";

import { useState } from "react";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import ScholarPoint from "@/components/profiles/ScholarPoint";
import InfoGrid from "@/components/profiles/InfoGrid";
import Roadmap from "@/components/profiles/Roadmap";
import UpdateProfileModal from "@/components/profiles/UpdateProfileModal";
import DocumentVerification from "@/components/profiles/DocumentVerification";
import { Button } from "@/components/ui/button";
import { PencilLine, Shield } from "lucide-react";

const ProfileContent = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  return (
    <div className="relative flex-1 p-4 md:p-6 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-end items-center mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsVerificationModalOpen(true)}
          >
            <Shield className="mr-2 h-4 w-4" />
            Document Verification
          </Button>
          <Button onClick={() => setIsUpdateModalOpen(true)}>
            <PencilLine className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-stretch">
        <div className="md:col-span-9 w-full">
          <ProfileHeader />
        </div>
        <div className="md:col-span-3 w-full">
          <ScholarPoint />
        </div>
      </div>

      <InfoGrid />

      <div className="mt-4">
        <Roadmap />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        loading={false}
      />

      {/* Document Verification Modal */}
      <DocumentVerification
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </div>
  );
};

// We don't need to wrap this with BlockchainProvider here
// since it's already wrapped by the Providers in app/providers.tsx
export default ProfileContent;
