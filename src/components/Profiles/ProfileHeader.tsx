import React from "react";

const infoLeft = [
  { label: "Fullname", value: "ngdakhoai1@gmail.com" },
  { label: "Gmail", value: "ngdakhoai1@gmail.com" },
  { label: "Phone", value: "1234567689" },
  { label: "Permanent Address", value: "Tan son, Go vap, HCM" },
  { label: "Religion", value: "" },
];

const infoRight = [
  { label: "Date of Birth", value: "21/2/2003" },
  { label: "Sex", value: "" },
  { label: "Passport Code", value: "" },
  { label: "Passport Expiral Date", value: "" },
  { label: "Nationality", value: "Vietnam" },
];

const ProfileHeader = () => (
  <div className="w-full bg-transparent">
    <div className="relative rounded-xl border border-gray-400 p-4 pt-6 bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-lg font-bold">
        Basic Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
        {/* Cột trái */}
        <div className="space-y-1">
          {infoLeft.map((item) => (
            <div key={item.label} className="flex">
              <span className="min-w-[120px] md:min-w-[140px] text-green-600 font-medium">{item.label} :</span>
              <span className="ml-2 text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
        {/* Cột phải */}
        <div className="space-y-1 mt-2 md:mt-0">
          {infoRight.map((item) => (
            <div key={item.label} className="flex">
              <span className="min-w-[120px] md:min-w-[140px] text-green-600 font-medium">{item.label} :</span>
              <span className="ml-2 text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;