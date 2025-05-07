export default function Strengths() {
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 relative border-2 border-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
        Strengths
      </h2>
      <ul className="space-y-2 sm:space-y-3 text-gray-700 pt-6 text-sm sm:text-base">
        <li className="flex items-start">
          <span className="text-blue-600 font-bold mr-2">•</span>
          <span>
            Academic Excellence – Top-ranked globally, 700+ programs, elite
            faculty.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 font-bold mr-2">•</span>
          <span>
            Research & Innovation – Pioneered insulin, AI, medical
            breakthroughs.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 font-bold mr-2">•</span>
          <span>
            Diverse Community – 160+ nationalities, strong international
            support.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 font-bold mr-2">•</span>
          <span>
            Career & Alumni Network – Ties with top firms, 650,000+ alumni
            worldwide.
          </span>
        </li>
      </ul>
    </div>
  );
}
