"use client";

import Image from "next/image";
import { FileText, CheckCircle } from "lucide-react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";

// Skeleton loader for InfoGrid
const InfoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="md:col-span-3 w-full h-[150px] rounded-xl border border-gray-400 bg-white p-4"
        >
          <div className="flex items-center mb-3">
            <div className="h-5 w-24 bg-gray-200 rounded mr-2"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

const InfoGrid = () => {
  const { userData, loading } = useBlockchain();

  // Helper function to get display value for select fields
  const getDisplayValue = (key: string, value: string) => {
    if (key === "maritalStatus") {
      const statuses: Record<string, string> = {
        single: "Single",
        married: "Married",
        divorced: "Divorced",
        widowed: "Widowed",
      };
      return statuses[value] || value;
    }

    return value;
  };

  // Show skeleton during loading
  if (loading || !userData || !userData.gridInfo) {
    return <InfoGridSkeleton />;
  }

  // Sử dụng trực tiếp userData.gridInfo
  const gridInfo = userData.gridInfo as Record<string, string>;

  // Find verified documents for each section
  const passportDoc = userData?.verifiedDocuments?.find(
    (doc) => doc.type === "passport"
  );
  const familyDoc = userData?.verifiedDocuments?.find(
    (doc) => doc.type === "family"
  );
  const budgetDoc = userData?.verifiedDocuments?.find(
    (doc) => doc.type === "budget"
  );

  const sections = [
    {
      id: "passport",
      title: "Passport",
      icon: <FileText className="h-8 w-8 text-blue-500 mb-2" />,
      verified: !!passportDoc,
      hash: passportDoc?.hash,
    },
    {
      id: "maritalStatus",
      title: "Marital Sta.",
    },
    {
      id: "family",
      title: "Family",
      icon: (
        <Image
          src="/placeholder.svg?height=50&width=50"
          width={50}
          height={50}
          alt="Family"
          className="mb-2"
        />
      ),
      verified: !!familyDoc,
      hash: familyDoc?.hash,
    },
    {
      id: "budget",
      title: "Budget",
      icon: <FileText className="h-8 w-8 text-green-500 mb-2" />,
      verified: !!budgetDoc,
      hash: budgetDoc?.hash,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {sections.map((section) => (
        <div
          key={section.id}
          className="relative rounded-xl border border-gray-400 p-6 min-h-[180px] bg-white"
        >
          <span className="absolute -top-4 left-6 bg-[#f8fafc] px-2 text-base font-semibold">
            {section.title}
          </span>

          <div className="pt-2 flex flex-col items-center justify-center h-full">
            {section.icon}
            {section.verified && (
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </div>
            )}
            <div className="text-center">
              {section.id === "maritalStatus" ? (
                <span>
                  {gridInfo[section.id]
                    ? getDisplayValue(section.id, gridInfo[section.id])
                    : "No information provided"}
                </span>
              ) : (
                <span>{gridInfo[section.id] || "No information provided"}</span>
              )}
              {section.hash && (
                <p className="text-xs text-gray-500 mt-1">
                  Hash: {section.hash.slice(0, 6)}...{section.hash.slice(-4)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;
