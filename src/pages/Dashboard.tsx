import ProductList from "@/components/ProductList";
import useProducts from "@/hooks/products/useProducts";

const Dashboard = () => {
  const { data, isLoading } = useProducts();

  return (
    <div>
      <ProductList data={data} isLoading={isLoading} heading="Hot Products" />
    </div>
  );
};

export default Dashboard;
