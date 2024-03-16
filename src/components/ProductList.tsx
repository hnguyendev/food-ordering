import ProductCard from "./ProductCard";
import SortOperations from "./SortOperations";
import { useSearchParams } from "react-router-dom";
import FullPageSpinner from "./FullPageSpinner";

import { FC } from "react";

interface Item {
  created_at: string;
  groupId: string | null;
  id: string;
  imageUrl: string | null;
  name: string | null;
  soldOut: boolean | null;
  unitPrice: number | null;
}

interface ProductListProps {
  data:
    | {
        created_at: string;
        groupId: string | null;
        id: string;
        imageUrl: string | null;
        name: string | null;
        soldOut: boolean | null;
        unitPrice: number | null;
      }[]
    | undefined;
  isLoading: boolean;
  heading: string;
}

const ProductList: FC<ProductListProps> = ({ data, isLoading, heading }) => {
  const [searchParams] = useSearchParams("");

  const sortBy = searchParams.get("sortBy") || "unitPrice-asc";
  const [value, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedData = data?.sort((a: Item, b: Item) => {
    const aValue = a[value as keyof Item];
    const bValue = b[value as keyof Item];

    // Handle cases where values might be null or undefined
    if (typeof aValue !== "number" || typeof bValue !== "number") {
      return 0; // or any other logic suitable for your use case
    }

    return (aValue - bValue) * modifier;
  });

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 items-center">
        <h3 className="font-bold text-lg lg:text-3xl">{heading}</h3>
        <SortOperations />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData?.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
