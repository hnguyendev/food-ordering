import ProductList from "@/components/ProductList";
import useDrink from "@/hooks/products/useDrink";

const Drink = () => {
  const { data, isLoading } = useDrink();
  return (
    <div>
      <ProductList data={data} isLoading={isLoading} heading="Drink" />
    </div>
  );
};

export default Drink;
