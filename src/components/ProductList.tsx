import useProducts from "@/hooks/products/useProducts";
import ProductCard from "./ProductCard";
import SortOperations from "./SortOperations";
import { useSearchParams } from "react-router-dom";
import FullPageSpinner from "./FullPageSpinner";

const ProductList = () => {
  const { data, isLoading } = useProducts();
  const [searchParams] = useSearchParams("");

  const sortBy = searchParams.get("sortBy") || "unitPrice-asc";
  const [value, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedData = data?.sort((a, b) => (a[value] - b[value]) * modifier);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 items-center">
        <h3 className="font-bold text-lg lg:text-3xl">Hot Products</h3>
        <SortOperations />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData?.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
