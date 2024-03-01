import FullPageSpinner from "@/components/FullPageSpinner";
import OrderDetail from "@/components/OrderDetail";
import useUser from "@/hooks/auth/useUser";
import useOrders from "@/hooks/orders/useOrders";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  const { data: orders, isLoading: isLoadingOrders } = useOrders();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoadingOrders) return <FullPageSpinner />;

  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="text-2xl font-semibold">Order History</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {orders?.map((order) => (
          <OrderDetail key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
