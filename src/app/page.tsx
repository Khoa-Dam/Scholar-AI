"use client";

import { useState } from "react";
import ProfileHeader from "@/components/Profiles/ProfileHeader";
import ScholarPoint from "@/components/Profiles/ScholarPoint";
import InfoGrid from "@/components/Profiles/InfoGrid";
import Roadmap from "@/components/Profiles/Roadmap";
import UpdateProfileModal from "@/components/Profiles/UpdateProfileModal";
import DocumentVerification from "@/components/Profiles/DocumentVerification";
import { Button } from "@/components/ui/button";
import { PencilLine, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ProfileContent = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="relative flex-1 p-4 md:p-6 bg-[#f8fafc] min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-end items-center mb-4"
        variants={buttonVariants}
      >
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
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-stretch"
        variants={itemVariants}
        layout
      >
        <motion.div
          className="md:col-span-9 w-full"
          variants={itemVariants}
          layout
        >
          <ProfileHeader />
        </motion.div>
        <motion.div
          className="md:col-span-3 w-full"
          variants={itemVariants}
          layout
        >
          <ScholarPoint />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} layout className="w-full">
        <InfoGrid />
      </motion.div>

      <motion.div className="mt-4 w-full" variants={itemVariants} layout>
        <Roadmap />
      </motion.div>

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
    </motion.div>
  );
};

// We don't need to wrap this with BlockchainProvider here
// since it's already wrapped by the Providers in app/providers.tsx
export default ProfileContent;
