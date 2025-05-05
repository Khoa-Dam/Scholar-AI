"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const legalSections = [
  {
    title: "Document Requirement",
    content: <div> {/* Nội dung tài liệu yêu cầu */} </div>,
  },
  {
    title: "Tax & Insurance",
    content: <div> {/* Nội dung thuế và bảo hiểm */} </div>,
  },
  {
    title: "Working Policy",
    content: <div> {/* Nội dung chính sách làm việc */} </div>,
  },
];

const LegalPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative flex-1 p-4 md:p-6 bg-[#f8fafc] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-4 md:gap-6 h-[80vh] min-h-[570px]">
        {/* Document Requirement chiếm 60% */}
        <div
          className="relative rounded-xl border border-gray-400 bg-[#f6f8fc] p-0 flex-[3] min-h-[180px] md:min-h-[0]"
        >
          <span className="absolute -top-4 left-4 md:left-6 bg-[#f6f8fc] px-2 md:px-3 text-base md:text-lg font-bold z-10">
            Document Requirement
          </span>
          <button
            className="absolute top-2 right-4 text-xl focus:outline-none z-10 bg-[#f6f8fc] rounded-full p-1"
            onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
            aria-label={openIndex === 0 ? 'Đóng' : 'Mở'}
          >
            {openIndex === 0 ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          <div className="pt-8 pb-6 px-3 md:px-6 h-full">
            {openIndex === 0 && (
              <div className="text-gray-700 h-full">{legalSections[0].content}</div>
            )}
          </div>
        </div>
        {/* Hai khối còn lại chia đều 40% */}
        {[1, 2].map((idx) => (
          <div
            key={legalSections[idx].title}
            className="relative rounded-xl border border-gray-400 bg-[#f6f8fc] p-0 flex-1 min-h-[100px] md:min-h-[0]"
          >
            <span className="absolute -top-4 left-4 md:left-6 bg-[#f6f8fc] px-2 md:px-3 text-base md:text-lg font-bold z-10">
              {legalSections[idx].title}
            </span>
            <button
              className="absolute top-2 right-4 text-xl focus:outline-none z-10 bg-[#f6f8fc] rounded-full p-1"
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              aria-label={openIndex === idx ? 'Đóng' : 'Mở'}
            >
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <div className="pt-8 pb-6 px-3 md:px-6 h-full">
              {openIndex === idx && (
                <div className="text-gray-700 h-full">{legalSections[idx].content}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage; 