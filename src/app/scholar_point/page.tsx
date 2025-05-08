"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/point/CourseCard";
import ScholarshipCard from "@/components/point/ScholarshipCard";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { useScholarContract } from "@/hooks/useScholarContract";
import { motion } from "framer-motion";

export default function Home() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useBlockchain();
  const { pointsData } = useScholarContract();

  // Define the animation variants for the cards
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    // Try to get data from localStorage first
    try {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData?.scholarPoints !== undefined) {
            setPoints(parsedData.scholarPoints);
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }

    // Priority for pointsData from contract
    if (pointsData !== undefined) {
      const newPoints = Number(pointsData);
      if (points !== newPoints) {
        setPoints(newPoints);
        setIsLoading(false);
      }
    } else if (userData?.scholarPoints !== undefined) {
      // Fallback to userData if pointsData not available
      const newPoints = userData.scholarPoints;
      if (points !== newPoints) {
        setPoints(newPoints);
        setIsLoading(false);
      }
    }
  }, [userData, pointsData]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-3">Scholar Point :</h1>
        <span className="text-4xl font-bold text-indigo-600">
          {isLoading ? "Loading..." : points}
        </span>
      </div>

      <section className="bg-gray-100 rounded-xl p-6 relative border-2 border-black mb-5">
        <h2 className="text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
          Course Offer
        </h2>
        <motion.div
          className="flex flex-wrap gap-3 pt-6"
          variants={container}
          initial="hidden"
          animate="show"
          layout
        >
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <CourseCard
              title="AI Course"
              company="SMURF Company"
              location="HCM City"
              points={500}
              imageSrc="/point/ai.png"
            />
          </motion.div>
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <CourseCard
              title="Finance Course"
              company="Tumilab Company"
              location="HCM City"
              points={100}
              imageSrc="/point/finance.png"
            />
          </motion.div>
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <CourseCard
              title="Blockchain Course"
              company="VBA"
              location="HCM City"
              points={200}
              imageSrc="/point/blockchain.png"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-gray-100 rounded-xl p-6 relative border-2 border-black">
        <h2 className="text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
          Scholarship Offer
        </h2>
        <motion.div
          className="flex flex-wrap gap-3 pt-6"
          variants={container}
          initial="hidden"
          animate="show"
          layout
        >
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <ScholarshipCard
              university="University of Toronto"
              state="Ontario State"
              city="Toronto City"
              points={800}
              imageSrc="/university/Toronto.png"
            />
          </motion.div>
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <ScholarshipCard
              university="McGill University"
              state="Montreal State"
              city="Québec City"
              points={200}
              imageSrc="/university/McGill.png"
            />
          </motion.div>
          <motion.div variants={item} className="w-full sm:max-w-xs" layout>
            <ScholarshipCard
              university="Carleton University"
              state="Ottawa State"
              city="Ontario City"
              points={100}
              imageSrc="/university/Carleton.png"
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
