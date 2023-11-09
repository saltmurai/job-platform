import pb from "@/pb";

type JobCardProps = {
  title: string;
  location: string;
  imgSrc: string;
  company: string;
  description: string;
  salary: string;
  tags: string[];
  url: string;
};

export default function JobCard(props: JobCardProps) {
  const applyHanlder = () => {
    window.open(`${props.url}`, `_blank`, `noopener,noreferrer`);
  };
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm w-80 hover:shadow-md">
      <div className="flex items-start space-x-4 p-4">
        <img
          alt="Company Logo"
          src={props.imgSrc ? props.imgSrc : "/next.svg"}
          className="aspect-square w-12 rounded-lg border-zinc-400"
        />
        <div className="flex flex-col justify-start">
          <h2 className="text-md font-semibold text-gray-900">{props.title}</h2>
          <p className="text-sm">{props.company}</p>
          <p className="text-gray-500 text-xs">{props.location}</p>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-gray-700 line-clamp-2">{props.description}</p>
        <div className="flex flex-wrap gap-1">
          {props.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200  text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="font-bold text-gray-900">Salary: $ {props.salary}</p>
      </div>
      <div className="flex justify-center p-2">
        <button
          onClick={applyHanlder}
          className="bg-gray-800 text-white px-4 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
