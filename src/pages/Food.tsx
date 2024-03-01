import ProductList from "@/components/ProductList";
import useFood from "@/hooks/products/useFood";

const Food = () => {
  const { data, isLoading } = useFood();
  return (
    <div>
      <ProductList data={data} isLoading={isLoading} heading="Food" />
    </div>
  );
};

export default Food;
