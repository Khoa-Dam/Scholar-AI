"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

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
  const toggleFromDropdown = () => {
    setIsToOpen(false);
    setIsBudgetOpen(false);
    setIsMajorOpen(false);
    setIsFromOpen(!isFromOpen);
  };

  const toggleToDropdown = () => {
    setIsFromOpen(false);
    setIsBudgetOpen(false);
    setIsMajorOpen(false);
    setIsToOpen(!isToOpen);
  };

  const toggleBudgetDropdown = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    setIsMajorOpen(false);
    setIsBudgetOpen(!isBudgetOpen);
  };

  const toggleMajorDropdown = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    setIsBudgetOpen(false);
    setIsMajorOpen(!isMajorOpen);
  };

  // Handlers for selections
  const handleFromSelect = (value: string) => {
    console.log("Selected From:", value);
    setSelectedFrom(value);
    setIsFromOpen(false);
  };

  const handleToSelect = (value: string) => {
    console.log("Selected To:", value);
    setSelectedTo(value);
    setIsToOpen(false);
  };

  const handleBudgetSelect = (value: string) => {
    console.log("Selected Budget:", value);
    setSelectedBudget(value);
    setIsBudgetOpen(false);
  };

  const handleMajorSelect = (value: string) => {
    console.log("Selected Major:", value);
    setSelectedMajor(value);
    setIsMajorOpen(false);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside any dropdown button or menu
      if (!target.closest(".dropdown-container")) {
        setIsFromOpen(false);
        setIsToOpen(false);
        setIsBudgetOpen(false);
        setIsMajorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full max-w-full">
      {/* From/To Country Container */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col md:flex-row w-full gap-4 p-4 sm:p-6 rounded-2xl border-2 border-black">
        {/* From Country Dropdown */}
        <div className="flex flex-row items-center gap-1 w-full flex-shrink min-w-0">
          <span className="font-medium text-gray-700 whitespace-nowrap">
            From:
          </span>
          <div className="relative w-full min-w-0 dropdown-container">
            <button
              className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base"
              onClick={toggleFromDropdown}
              type="button"
            >
              <span className="truncate">{selectedFrom}</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
            </button>
            {/* Dropdown when isFromOpen is true */}
            {isFromOpen && (
              <div
                className="absolute left-0 right-0 mt-2 bg-white border border-black rounded-lg shadow-lg"
                style={{ zIndex: 9999 }}
              >
                <ul className="py-2 max-h-60 overflow-auto">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFromSelect("USA")}
                  >
                    USA
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFromSelect("Canada")}
                  >
                    Canada
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFromSelect("Germany")}
                  >
                    Germany
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFromSelect("Australia")}
                  >
                    Australia
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFromSelect("Vietnam")}
                  >
                    Vietnam
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
          <div className="relative w-full min-w-0 dropdown-container">
            <button
              className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base"
              onClick={toggleToDropdown}
              type="button"
            >
              <span className="truncate">{selectedTo}</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
            </button>
            {/* Dropdown when isToOpen is true */}
            {isToOpen && (
              <div
                className="absolute left-0 right-0 mt-2 bg-white border border-black rounded-lg shadow-lg"
                style={{ zIndex: 9999 }}
              >
                <ul className="py-2 max-h-60 overflow-auto">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleToSelect("USA")}
                  >
                    USA
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleToSelect("Canada")}
                  >
                    Canada
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleToSelect("Germany")}
                  >
                    Germany
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleToSelect("Australia")}
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
      <div className="col-span-1 flex items-center gap-1 w-full p-4 sm:p-6 rounded-2xl border-2 border-black">
        <span className="font-medium text-gray-700 whitespace-nowrap">
          Budget:
        </span>
        <div className="relative w-full min-w-0 dropdown-container">
          <button
            className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base"
            onClick={toggleBudgetDropdown}
            type="button"
          >
            <span className="truncate">{selectedBudget}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
          </button>
          {/* Dropdown when isBudgetOpen is true */}
          {isBudgetOpen && (
            <div
              className="absolute left-0 right-0 mt-2 bg-white border border-black rounded-lg shadow-lg"
              style={{ zIndex: 9999 }}
            >
              <ul className="py-2 max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleBudgetSelect("Under $10,000")}
                >
                  Under $10,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleBudgetSelect("$10,000 - $20,000")}
                >
                  $10,000 - $20,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleBudgetSelect("$20,000 - $30,000")}
                >
                  $20,000 - $30,000
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleBudgetSelect("Above $30,000")}
                >
                  Above $30,000
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Major Dropdown */}
      <div className="col-span-1 flex items-center gap-1 w-full p-4 sm:p-6 rounded-2xl border-2 border-black">
        <span className="font-medium text-gray-700 whitespace-nowrap">
          Major:
        </span>
        <div className="relative w-full min-w-0 dropdown-container">
          <button
            className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-2 py-2 text-gray-500 text-sm sm:text-base"
            onClick={toggleMajorDropdown}
            type="button"
          >
            <span className="truncate">{selectedMajor}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 ml-1" />
          </button>
          {/* Dropdown when isMajorOpen is true */}
          {isMajorOpen && (
            <div
              className="absolute left-0 right-0 mt-2 bg-white border border-black rounded-lg shadow-lg"
              style={{ zIndex: 9999 }}
            >
              <ul className="py-2 max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMajorSelect("Computer Science")}
                >
                  Computer Science
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMajorSelect("Business Administration")}
                >
                  Business Administration
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMajorSelect("Mechanical Engineering")}
                >
                  Mechanical Engineering
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMajorSelect("Psychology")}
                >
                  Psychology
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CSS để đảm bảo dropdown hiển thị đúng */}
      <style jsx global>{`
        .dropdown-container {
          position: relative;
        }
      `}</style>
    </div>
  );
}
