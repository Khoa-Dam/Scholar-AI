"use client";
import React from "react";

interface Section {
  title: string;
  items: string[];
}

interface BudgetBoxProps {
  title: string;
  sections: Section[];
  total: string;
}

const BudgetBox: React.FC<BudgetBoxProps> = ({ title, sections, total }) => {
  return (
    <div className="relative rounded-xl border border-gray-400 bg-white p-4 w-full h-full flex flex-col">
      <span className="absolute -top-4 left-4 bg-white px-2 text-lg font-bold z-10">
        {title}
      </span>

      {/* Budget input */}
      <div className="flex justify-between items-center mt-2 mb-4">
        <label className="font-medium">Budget:</label>
        <div className="flex w-[300px]">
          <input
            type="text"
            placeholder="Enter your amount"
            className="px-3 py-1 outline-none text-sm flex-1 border rounded-l-full"
          />
          <select className="bg-gray-100 px-2 py-1 text-sm border rounded-r-full border-l-0">
            <option>CAD</option>
          </select>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3 flex-grow">
        {sections.map((section: Section, idx: number) => (
          <div key={idx} className="mb-3">
            <div className="bg-indigo-500 text-white px-3 py-1 font-medium rounded-t-md">
              {section.title}
            </div>
            <div className="bg-white border border-indigo-100 px-3 py-1 space-y-1 rounded-b-md">
              {section.items.map((item: string, i: number) => (
                <div key={i} className="flex justify-between">
                  <span>{item}</span>
                  <span>:</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-indigo-500 text-white font-bold px-4 py-1 mt-3 rounded-md flex justify-between">
        <span>Total :</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default function BudgetUI(): React.ReactElement {
  const studyFeeSections: Section[] = [
    {
      title: "Started",
      items: ["Bank Account", "Cash", "Scholarship"],
    },
    {
      title: "Monthly Tuition Fees",
      items: ["Main Tuition", "Extracurricular Tuition"],
    },
    {
      title: "Monthly orders",
      items: ["Study Insurance", "Study Tools"],
    },
  ];

  const livingCostSections: Section[] = [
    {
      title: "Started",
      items: ["Bank Account", "Cash", "Part-time Job Income"],
    },
    {
      title: "Cost",
      items: ["Rent", "Food & Drinks", "Other Cost", "Insurance"],
    },
  ];

  return (
    <div className="relative flex-1 p-4 md:p-6 bg-[#f8fafc] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <BudgetBox title="Study Fee" sections={studyFeeSections} total="0000" />
        <BudgetBox title="Living Cost" sections={livingCostSections} total="0000" />
      </div>

      {/* Footer Total */}
      <div className="w-full max-w-6xl bg-green-600 text-white font-bold px-6 py-2 rounded-md flex justify-between items-center">
        <span className="text-lg">Total</span>
        <span className="text-lg">00000</span>
      </div>
    </div>
  );
}
