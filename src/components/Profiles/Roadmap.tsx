"use client";

import { useBlockchain } from "@/components/blockchain/BlockchainContext";

const Roadmap = () => {
  const { userData } = useBlockchain();
  const roadmapContent = userData?.roadmap || "";

  return (
    <div className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white">
      <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">
        Your Roadmap
      </span>

      <div className="pt-2">
        <div className="prose max-w-none">
          {roadmapContent ? (
            <p>{roadmapContent}</p>
          ) : (
            <p className="text-gray-500">No roadmap information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
