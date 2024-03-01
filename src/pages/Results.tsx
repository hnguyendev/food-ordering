import FullPageSpinner from "@/components/FullPageSpinner";
import ProductCard from "@/components/ProductCard";
import useSearchTest from "@/hooks/useSearchTest";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

interface ResultsProps {}

const Results: FC<ResultsProps> = () => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get("query") as string;
  const { data, isPending } = useSearchTest(value);

  if (isPending) return <FullPageSpinner />;

  if (!data?.length) return <span>0 result found. Please try again!</span>;

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 items-center">
        <p className="text-sm lg:text-lg">
          {data.length} {data.length > 1 ? "results" : "result"} for "
          <span className="font-semibold">{value}</span>"
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Results;
