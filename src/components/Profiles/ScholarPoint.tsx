"use client";

import { useScholarContract } from "@/hooks/useScholarContract";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const { pointsData, refetchPoints } = useScholarContract();
  const [displayPoints, setDisplayPoints] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchPoints = async () => {
      try {
        // Gọi refetchPoints để đảm bảo dữ liệu mới nhất
        await refetchPoints();

        if (!isMounted) return;

        if (pointsData !== undefined) {
          setDisplayPoints(Number(pointsData));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPoints();

    return () => {
      isMounted = false;
    };
  }, [pointsData, refetchPoints]);

  // Show skeleton during loading
  if (isLoading) {
    return <PointSkeleton />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center rounded-lg border border-gray-400 bg-white shadow p-4">
      <span className="text-6xl font-bold text-blue-500">{displayPoints}</span>
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
