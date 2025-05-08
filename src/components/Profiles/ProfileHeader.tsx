"use client";

import { useBlockchain } from "@/components/blockchain/BlockchainContext";

const ProfileHeader = () => {
  const { userData } = useBlockchain();
  const basicInfo: Record<string, string> = userData?.basicInfo || {};

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
