"use client";

import { useEffect, useState } from "react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { useScholarContract } from "@/hooks/useScholarContract";

// Skeleton loader component
const PointSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center rounded-lg border border-gray-400 bg-white shadow p-4 animate-pulse">
      <div className="h-16 w-16 bg-gray-200 rounded-full mb-2"></div>
      <div className="h-6 w-32 bg-gray-200 rounded mt-2"></div>
    </div>
  );
};

const ScholarPoint = () => {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useBlockchain();
  const { pointsData } = useScholarContract();

  useEffect(() => {
    // Lấy dữ liệu từ localStorage nếu có
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.scholarPoints !== undefined) {
          setPoints(parsedData.scholarPoints);
          // Hiển thị dữ liệu từ cache trước
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }

    // Ưu tiên lấy điểm từ getMyPoints (pointsData) nếu có
    if (pointsData !== undefined) {
      const newPoints = Number(pointsData);
      if (points !== newPoints) {
        setPoints(newPoints);
        setIsLoading(false);
      }
    } else if (userData?.scholarPoints !== undefined) {
      // Fallback về cách cũ nếu không có dữ liệu từ getMyPoints
      const newPoints = userData.scholarPoints;
      if (points !== newPoints) {
        setPoints(newPoints);
        setIsLoading(false);
      }
    }
  }, [userData, pointsData]);

  // Show skeleton during loading
  if (isLoading) {
    return <PointSkeleton />;
  }

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
