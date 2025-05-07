import Image from "next/image";
import { Card } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  company: string;
  location: string;
  points: number;
  imageSrc: string;
}

export default function CourseCard({
  title,
  company,
  location,
  points,
  imageSrc,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden border rounded-lg w-full sm:max-w-xs p-0">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-1">
          {company}
        </p>
        <div className="flex justify-between items-center mt-1 sm:mt-2">
          <span className="text-gray-600 text-sm sm:text-base line-clamp-1">
            {location}
          </span>
          <span className="font-bold text-green-600 text-sm sm:text-base">
            {points} SP
          </span>
        </div>
      </div>
    </Card>
  );
}
