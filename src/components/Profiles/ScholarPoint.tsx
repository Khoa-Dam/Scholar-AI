"use client";

import { useEffect, useState } from "react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { useScholarContract } from "@/hooks/useScholarContract";

const ScholarPoint = () => {
  const [points, setPoints] = useState(0);
  const { userData } = useBlockchain();
  const { pointsData } = useScholarContract();

  useEffect(() => {
    // Ưu tiên lấy điểm từ getMyPoints (pointsData) nếu có
    if (pointsData !== undefined) {
      setPoints(Number(pointsData));
    } else if (userData?.scholarPoints) {
      // Fallback về cách cũ nếu không có dữ liệu từ getMyPoints
      setPoints(userData.scholarPoints);
    }
  }, [userData, pointsData]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center rounded-lg border border-gray-400 bg-white shadow p-4">
      <span className="text-6xl font-bold text-blue-500">{points}</span>
      <span className="mt-2 text-xl font-semibold">Scholar Point</span>

      {/* <Button
        onClick={handleAddPoints}
        disabled={loading}
        className="mt-4 bg-green-500 hover:bg-green-600"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tăng điểm
          </>
        )}
      </Button> */}
    </div>
  );
};

export default ScholarPoint;
