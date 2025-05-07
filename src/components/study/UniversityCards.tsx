"use client";

import Image from "next/image";

interface University {
  id: number;
  name: string;
  image: string;
  state: string;
  city: string;
  rank: string;
}

interface UniversityCardsProps {
  universities: University[];
  selectedUniversity: string;
  onSelectUniversity: (name: string) => void;
}

export default function UniversityCards({
  universities,
  selectedUniversity,
  onSelectUniversity,
}: UniversityCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {universities.map((university) => (
        <div
          key={university.id}
          className={`bg-white rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
            selectedUniversity === university.name
              ? "border-blue-500 shadow-lg"
              : "border-gray-200"
          }`}
          onClick={() => onSelectUniversity(university.name)}
        >
          <div className="h-32 sm:h-40 relative">
            <Image
              src={university.image || "/placeholder.svg"}
              alt={university.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-bold text-base sm:text-lg truncate">
              {university.name}
            </h3>
            <p className="text-gray-600 text-sm">{university.state}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600 text-sm">{university.city}</span>
              <span className="font-bold text-blue-600">{university.rank}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
