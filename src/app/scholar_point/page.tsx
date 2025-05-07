import CourseCard from "@/components/point/course-card";
import ScholarshipCard from "@/components/point/scholarship-card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-3">Scholar Point :</h1>
        <span className="text-4xl font-bold text-indigo-600">1231</span>
      </div>

      <section className="bg-gray-100 rounded-xl p-6 relative border-2 border-black mb-5">
        <h2 className="text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
          Course Offer
        </h2>
        <div className="flex flex-wrap gap-3 pt-6">
          <CourseCard
            title="AI Course"
            company="SMURF Company"
            location="HCM City"
            points={500}
            imageSrc="/point/ai.png"
          />
          <CourseCard
            title="Finance Course"
            company="Tumilab Company"
            location="HCM City"
            points={100}
            imageSrc="/point/finance.png"
          />
          <CourseCard
            title="Blockchain Course"
            company="VBA"
            location="HCM City"
            points={200}
            imageSrc="/point/blockchain.png"
          />
        </div>
      </section>

      <section className="bg-gray-100 rounded-xl p-6 relative border-2 border-black">
        <h2 className="text-2xl font-bold mb-4 absolute -top-4 left-4 bg-gray-100 px-2">
          Scholarship Offer
        </h2>
        <div className="flex flex-wrap gap-3 pt-6">
          <ScholarshipCard
            university="University of Toronto"
            state="Ontario State"
            city="Toronto City"
            points={800}
            imageSrc="/university/Toronto.png"
          />
          <ScholarshipCard
            university="McGill University"
            state="Montreal State"
            city="Québec City"
            points={200}
            imageSrc="/university/McGill.png"
          />
          <ScholarshipCard
            university="Carleton University"
            state="Ottawa State"
            city="Ontario City"
            points={100}
            imageSrc="/university/Carleton.png"
          />
        </div>
      </section>
    </main>
  );
}
