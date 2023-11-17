import { Inter } from "next/font/google";
import pb from "@/pb";
import JobCard from "@/components/JobCard";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: any }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-bold tracking-wide">
          KOREA IT JOBS LISTING
        </h2>
        <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
          Explore our current job openings.
        </p>
        <div className="flex w-full justify-center mb-6">
          <input
            aria-label="Search jobs"
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search jobs..."
            type="search"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {data.map((job: any) => (
          <JobCard
            key={job.id}
            title={job.title}
            location={job.location}
            description={job.description}
            salary={job.salary}
            tags={job.tags}
            url={job.applyUrl}
            imgSrc={job.image}
            company={job.company}
          />
        ))}
      </div>

      {/* <JobCard /> */}
    </main>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  let data;
  try {
    const records = await pb.collection("jobs").getFullList();
    const recordsWithImageUrl = records.map((record: any) => {
      const image = record.image;
      const imageURL = pb.getFileUrl(record, image);
      return { ...record, image: imageURL };
    });
    data = recordsWithImageUrl;
  } catch (e: any) {
    console.log(e);
    return {
      notFound: true,
    };
  }
  // Pass data to the page via props
  return { props: { data } };
}
