interface SchoolInfoProps {
  info: string;
}

export default function SchoolInfo({ info }: SchoolInfoProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">School Information</h2>
      <p className="text-gray-700 leading-relaxed">{info}</p>
    </div>
  );
}
