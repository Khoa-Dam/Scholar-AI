import Image from "next/image";
import { Card } from "@/components/ui/card";

interface ScholarshipCardProps {
  university: string;
  state: string;
  city: string;
  points: number;
  imageSrc: string;
}

export default function ScholarshipCard({
  university,
  state,
  city,
  points,
  imageSrc,
}: ScholarshipCardProps) {
  return (
    <Card className="overflow-hidden border rounded-lg w-full sm:max-w-xs p-0">
      <div className="relative w-full aspect-video sm:aspect-[16/9]">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={university}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg line-clamp-1">
          {university}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-1">
          {state}
        </p>
        <div className="flex justify-between items-center mt-1 sm:mt-2">
          <span className="text-gray-600 text-sm sm:text-base line-clamp-1">
            {city}
          </span>
          <span className="font-bold text-green-600 text-sm sm:text-base">
            {points} SP
          </span>
        </div>
      </div>
    </Card>
  );
}
