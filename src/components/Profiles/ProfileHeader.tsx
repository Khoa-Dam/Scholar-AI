"use client";

import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { useEffect, useState } from "react";

// Skeleton loader component
const ProfileSkeleton = () => {
  return (
    <div className="w-full bg-transparent animate-pulse">
      <div className="relative rounded-xl border border-gray-400 p-4 pt-6 bg-white">
        <div className="absolute -top-4 left-6 bg-[#f8fafc] px-2 h-6 w-40 rounded"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
          {/* Left column skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row sm:items-center"
              >
                <div className="min-w-[120px] md:min-w-[140px] h-5 bg-gray-200 rounded"></div>
                <div className="ml-0 sm:ml-2 h-5 w-full mt-1 sm:mt-0 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Right column skeleton */}
          <div className="space-y-3 mt-3 md:mt-0">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row sm:items-center"
              >
                <div className="min-w-[120px] md:min-w-[140px] h-5 bg-gray-200 rounded"></div>
                <div className="ml-0 sm:ml-2 h-5 w-full mt-1 sm:mt-0 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = () => {
  const { userData } = useBlockchain();
  const [isLoading, setIsLoading] = useState(true);
  const [cachedInfo, setCachedInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    // Lấy dữ liệu từ localStorage nếu có
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.basicInfo) {
          setCachedInfo(parsedData.basicInfo);
          // Hiển thị dữ liệu từ cache trước
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }

    // Nếu có userData thực tế, cập nhật lại
    if (userData?.basicInfo) {
      // Only update if the data is different to prevent infinite loops
      const isEqual =
        JSON.stringify(cachedInfo) === JSON.stringify(userData.basicInfo);
      if (!isEqual) {
        setCachedInfo(userData.basicInfo);
        setIsLoading(false);
      }
    }
  }, [userData]); // Only depend on userData, not cachedInfo

  // Sử dụng cachedInfo hoặc userData.basicInfo
  const basicInfo: Record<string, string> = cachedInfo || {};

  const infoLeft = [
    { label: "Fullname", key: "fullname" },
    { label: "Gmail", key: "gmail" },
    { label: "Phone", key: "phone" },
    { label: "Permanent Address", key: "permanentAddress" },
    { label: "Religion", key: "religion" },
  ];

  const infoRight = [
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Sex", key: "sex" },
    { label: "Passport Code", key: "passportCode" },
    { label: "Passport Expiral Date", key: "passportExpiralDate" },
    { label: "Nationality", key: "nationality" },
  ];

  // Helper function to get display value for select fields
  const getDisplayValue = (key: string, value: string) => {
    if (key === "religion") {
      const religions: Record<string, string> = {
        buddhism: "Buddhism",
        christianity: "Christianity",
        hinduism: "Hinduism",
        islam: "Islam",
        judaism: "Judaism",
        none: "None",
        other: "Other",
      };
      return religions[value] || value;
    }

    if (key === "sex") {
      const sexOptions: Record<string, string> = {
        male: "Male",
        female: "Female",
        other: "Other",
      };
      return sexOptions[value] || value;
    }

    if (key === "nationality") {
      const nationalities: Record<string, string> = {
        vietnam: "Vietnam",
        usa: "United States",
        china: "China",
        japan: "Japan",
        korea: "South Korea",
        singapore: "Singapore",
        thailand: "Thailand",
        malaysia: "Malaysia",
        other: "Other",
      };
      return nationalities[value] || value;
    }

    return value;
  };

  // Show skeleton during loading
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full bg-transparent">
      <div className="relative rounded-xl border border-gray-400 p-4 pt-6 bg-white">
        <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-lg font-bold">
          Basic Information
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
          {/* Left column */}
          <div className="space-y-3">
            {infoLeft.map((item) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row sm:items-center"
              >
                <span className="min-w-[120px] md:min-w-[140px] text-green-600 font-medium">
                  {item.label} :
                </span>
                <span className="ml-0 sm:ml-2 text-gray-800">
                  {basicInfo[item.key]
                    ? getDisplayValue(item.key, basicInfo[item.key])
                    : "-"}
                </span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3 mt-3 md:mt-0">
            {infoRight.map((item) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row sm:items-center"
              >
                <span className="min-w-[120px] md:min-w-[140px] text-green-600 font-medium">
                  {item.label} :
                </span>
                <span className="ml-0 sm:ml-2 text-gray-800">
                  {basicInfo[item.key]
                    ? getDisplayValue(item.key, basicInfo[item.key])
                    : "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
