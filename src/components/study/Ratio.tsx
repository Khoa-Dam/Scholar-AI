export default function Ratio() {
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 relative border-2 border-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
        Ratio
      </h2>
      <div className="flex items-center justify-center pt-6">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-full shadow-lg">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-500">
            98%
          </div>
        </div>
      </div>
    </div>
  );
}
