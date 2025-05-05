import React from "react";

const InfoGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
    <div className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">Passport</span>
      <div className="pt-2" />
    </div>
    <div className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">Marital Sta.</span>
      <div className="pt-2" />
    </div>
    <div className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">Family</span>
      <div className="pt-2" />
    </div>
    <div className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">Budget</span>
      <div className="pt-2" />
    </div>
  </div>
);

export default InfoGrid;