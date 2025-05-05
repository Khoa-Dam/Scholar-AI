import { ChevronDown } from "lucide-react";

export default function CustomFilters() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="col-span-2 flex flex-row w-full gap-4 p-6 rounded-2xl border-2 border-black">
        <div className="flex flex-row items-center gap-1 w-full">
          <span className="font-medium text-gray-700 min-w-16">From:</span>
          <div className="relative w-full">
            <button className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-4 py-2 text-gray-500">
              <span>Choose your country</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1 w-full">
          <span className="font-medium text-gray-700 min-w-16">To:</span>
          <div className="relative w-full">
            <button className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-4 py-2 text-gray-500">
              <span>Choose your country</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex items-center gap-2 w-full p-6 rounded-2xl border-2 border-black">
        <span className="font-medium text-gray-700 min-w-16">Budget:</span>
        <div className="relative w-full">
          <button className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-4 py-2 text-gray-500">
            <span>Choose Budget</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="col-span-1 flex items-center gap-2 w-full p-6 rounded-2xl border-2 border-black">
        <span className="font-medium text-gray-700 min-w-16">Major:</span>
        <div className="relative w-full">
          <button className="w-full flex items-center justify-between bg-[#ebebeb] border border-black rounded-full px-4 py-2 text-gray-500">
            <span>Choose major</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
