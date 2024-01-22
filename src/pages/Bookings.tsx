import useUser from "@/hooks/auth/useUser";
import useOrders from "@/hooks/orders/useOrders";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, data } = useUser();
  const userId = data?.id as string;
  const { data: orders } = useOrders(userId);
  console.log(orders);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return <div className="flex flex-col gap-y-6">Bookings</div>;
};

export default Bookings;
