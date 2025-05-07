"use client";

import { useState, useEffect } from "react";
import FiltersBar from "@/components/study/FilterBar";
import UniversityCards from "@/components/study/UniversityCards";
import SchoolInfo from "@/components/study/SchoolInfo";
import CompatibilityResult from "@/components/study/CompatibilityResult";
import Strengths from "@/components/study/Strengths";
import Ratio from "@/components/study/Ratio";

export default function StudyPage() {
  const universitiesStatic = [
    {
      id: 1,
      name: "University of Toronto",
      image: "/university/Toronto.png",
      state: "Ontario State",
      city: "Toronto City",
      rank: "#1",
      info: "The University of Toronto, established in 1827 in Ontario, Canada, is one of the world's top universities, ranked 21st by QS Rankings 2024. It features the third-largest library in North America and offers a diverse range of programs, including strengths in science, engineering, and health fields.",
    },
    {
      id: 2,
      name: "McGill University",
      image: "/university/McGill.png",
      state: "Montreal State",
      city: "Québec City",
      rank: "#2",
      info: "McGill University, founded in 1821, is consistently ranked among the top universities in Canada and globally. Located in Montreal, it is known for its strong programs in medicine, law, and engineering, with a diverse international student body.",
    },
    {
      id: 3,
      name: "Carleton University",
      image: "/university/Carleton.png",
      state: "Ottawa State",
      city: "Ontario City",
      rank: "#3",
      info: "Carleton University, established in 1942, is located in Ottawa, Canada's capital. It is known for its programs in journalism, public affairs, engineering, and high-technology disciplines, with strong connections to government institutions and industry partners.",
    },
    {
      id: 4,
      name: "University of Ottawa",
      image: "/university/Ottawa.png",
      state: "Ottawa State",
      city: "Ontario City",
      rank: "#4",
      info: "The University of Ottawa, founded in 1848, is the world's largest English-French bilingual university. Located in the heart of Canada's capital, it offers a wide range of programs with strengths in law, medicine, and social sciences.",
    },
  ];

  const [universities, setUniversities] = useState(universitiesStatic);
  const [selectedUniversity, setSelectedUniversity] = useState(
    "University of Toronto"
  );

  useEffect(() => {
    const fetchData = async () => {
      setUniversities(universitiesStatic);
      setSelectedUniversity(universitiesStatic[0].name);
    };

    fetchData();
  }, []);

  const selectedUni =
    universities.find((uni) => uni.name === selectedUniversity) ||
    universities[0];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <FiltersBar />

      {/* University Cards */}
      <UniversityCards
        universities={universities}
        selectedUniversity={selectedUniversity}
        onSelectUniversity={setSelectedUniversity}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SchoolInfo info={selectedUni.info} />
        <Strengths />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Ratio />
        </div>
        <div className="md:col-span-3">
          <CompatibilityResult />
        </div>
      </div>
    </div>
  );
}
