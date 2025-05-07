import React from "react";
import ProfileHeader from "@/components/Profiles/ProfileHeader";
import ScholarPoint from "@/components/Profiles/ScholarPoint";
import InfoGrid from "@/components/Profiles/InfoGrid";
import Roadmap from "@/components/Profiles/Roadmap";

const ProfilePage = () => (
  <div className="relative flex-1 p-4 md:p-6 bg-[#f8fafc] min-h-screen">
    {/* Hàng trên: Thông tin cơ bản + Scholar Point */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-stretch">
      <div className="md:col-span-9 w-full">
        <ProfileHeader />
      </div>
      <div className="md:col-span-3 w-full">
        <ScholarPoint />
      </div>
    </div>
    {/* Hàng giữa: 4 khối nhỏ */}
    <InfoGrid />
    {/* Hàng dưới: Roadmap */}
    <div className="mt-4">
      <Roadmap />
    </div>
  </div>
);

export default ProfilePage;
