"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomFilters() {
  // State to manage dropdown open/close
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isMajorOpen, setIsMajorOpen] = useState(false);

  // State to store selected values
  const [selectedFrom, setSelectedFrom] = useState("Choose your country");
  const [selectedTo, setSelectedTo] = useState("Choose your country");
  const [selectedBudget, setSelectedBudget] = useState("Choose Budget");
  const [selectedMajor, setSelectedMajor] = useState("Choose major");

  // Toggle dropdowns
  const toggleFromDropdown = () => setIsFromOpen(!isFromOpen);
  const toggleToDropdown = () => setIsToOpen(!isToOpen);
  const toggleBudgetDropdown = () => setIsBudgetOpen(!isBudgetOpen);
  const toggleMajorDropdown = () => setIsMajorOpen(!isMajorOpen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full max-w-full overflow-hidden">
      {/* From/To Country Container */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col md:flex-row w-full gap-4 p-4 sm:p-6 rounded-2xl border-2 border-black overflow-hidden">
        {/* From Country Dropdown */}
        <div className="flex flex-row items-center gap-1 w-full flex-shrink min-w-0">
          <span className="font-medium text-gray-700 whitespace-nowrap">
            From:
          </span>
          <div className="relative w-full min-w-0 overflow-hidden">
            <button
              className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base overflow-hidden"
              onClick={toggleFromDropdown}
            >
              <span className="truncate">{selectedFrom}</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
            </button>
            {/* Dropdown when isFromOpen is true */}
            {isFromOpen && (
              <div className="absolute w-full mt-2 bg-white border border-black rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedFrom("USA");
                      setIsFromOpen(false);
                    }}
                  >
                    USA
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedFrom("Canada");
                      setIsFromOpen(false);
                    }}
                  >
                    Canada
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedFrom("Germany");
                      setIsFromOpen(false);
                    }}
                  >
                    Germany
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedFrom("Australia");
                      setIsFromOpen(false);
                    }}
                  >
                    Australia
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* To Country Dropdown */}
        <div className="flex flex-row items-center gap-1 w-full flex-shrink min-w-0 mt-4 md:mt-0">
          <span className="font-medium text-gray-700 whitespace-nowrap">
            To:
          </span>
          <div className="relative w-full min-w-0 overflow-hidden">
            <button
              className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base overflow-hidden"
              onClick={toggleToDropdown}
            >
              <span className="truncate">{selectedTo}</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
            </button>
            {/* Dropdown when isToOpen is true */}
            {isToOpen && (
              <div className="absolute w-full mt-2 bg-white border border-black rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedTo("USA");
                      setIsToOpen(false);
                    }}
                  >
                    USA
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedTo("Canada");
                      setIsToOpen(false);
                    }}
                  >
                    Canada
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedTo("Germany");
                      setIsToOpen(false);
                    }}
                  >
                    Germany
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedTo("Australia");
                      setIsToOpen(false);
                    }}
                  >
                    Australia
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Budget Dropdown */}
      <div className="col-span-1 flex items-center gap-1 w-full p-4 sm:p-6 rounded-2xl border-2 border-black overflow-hidden">
        <span className="font-medium text-gray-700 whitespace-nowrap">
          Budget:
        </span>
        <div className="relative w-full min-w-0 overflow-hidden">
          <button
            className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base overflow-hidden"
            onClick={toggleBudgetDropdown}
          >
            <span className="truncate">{selectedBudget}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
          </button>
          {/* Dropdown when isBudgetOpen is true */}
          {isBudgetOpen && (
            <div className="absolute w-full mt-2 bg-white border border-black rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedBudget("Under $10,000");
                    setIsBudgetOpen(false);
                  }}
                >
                  Under $10,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedBudget("$10,000 - $20,000");
                    setIsBudgetOpen(false);
                  }}
                >
                  $10,000 - $20,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedBudget("$20,000 - $30,000");
                    setIsBudgetOpen(false);
                  }}
                >
                  $20,000 - $30,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedBudget("Above $30,000");
                    setIsBudgetOpen(false);
                  }}
                >
                  Above $30,000
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Major Dropdown */}
      <div className="col-span-1 flex items-center gap-1 w-full p-4 sm:p-6 rounded-2xl border-2 border-black overflow-hidden">
        <span className="font-medium text-gray-700 whitespace-nowrap">
          Major:
        </span>
        <div className="relative w-full min-w-0 overflow-hidden">
          <button
            className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base overflow-hidden"
            onClick={toggleMajorDropdown}
          >
            <span className="truncate">{selectedMajor}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
          </button>
          {/* Dropdown when isMajorOpen is true */}
          {isMajorOpen && (
            <div className="absolute w-full mt-2 bg-white border border-black rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMajor("Computer Science");
                    setIsMajorOpen(false);
                  }}
                >
                  Computer Science
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMajor("Business Administration");
                    setIsMajorOpen(false);
                  }}
                >
                  Business Administration
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMajor("Mechanical Engineering");
                    setIsMajorOpen(false);
                  }}
                >
                  Mechanical Engineering
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMajor("Psychology");
                    setIsMajorOpen(false);
                  }}
                >
                  Psychology
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
