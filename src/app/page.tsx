import React from "react";
import ProfileHeader from "@/components/Profiles/ProfileHeader";
import ScholarPoint from "@/components/Profiles/ScholarPoint";
import InfoGrid from "@/components/Profiles/InfoGrid";
import Roadmap from "@/components/Profiles/ Roadmap";

const ProfilePage = () => (
  <div className="relative flex-1 p-6 bg-[#f8fafc] min-h-screen">
    {/* Hàng trên: Thông tin cơ bản + Scholar Point */}
    <div className="grid grid-cols-12 gap-4 mb-4 items-stretch">
      <div className="col-span-9 h-full">
        <ProfileHeader />
      </div>
      <div className="col-span-3 h-full flex">
        <ScholarPoint />
      </div>
    </div>
    {/* Hàng giữa: 4 khối nhỏ */}
    <InfoGrid />
    {/* Hàng dưới: Roadmap */}
    <Roadmap />
  </div>
);

export default ProfilePage;