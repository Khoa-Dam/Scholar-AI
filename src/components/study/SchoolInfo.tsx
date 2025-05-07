interface SchoolInfoProps {
  info: string;
}

export default function SchoolInfo({ info }: SchoolInfoProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 relative border-2 border-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
        School Information
      </h2>
      <p className="text-gray-700 leading-relaxed pt-6 text-sm sm:text-base">
        {info}
      </p>
    </div>
  );
}
