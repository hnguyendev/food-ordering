import ProductList from "@/components/ProductList";
import { useCart } from "@/store/useCart";

const Dashboard = () => {
  const { cart } = useCart();
  console.log(cart);
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Dashboard;
