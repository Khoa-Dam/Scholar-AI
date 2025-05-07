export default function CompatibilityResult() {
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 relative border-2 border-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
        Compatibility Result
      </h2>
      <div className="min-h-40 flex items-center justify-center pt-6">
        <p className="text-gray-500 italic text-sm sm:text-base">
          Select your preferences to see compatibility results
        </p>
      </div>
    </div>
  );
}
