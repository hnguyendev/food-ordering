import { getOrders } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";
import useUser from "../auth/useUser";

const useOrders = () => {
  const { data: user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getOrders(user?.id as string),
    queryKey: ["orders", user?.id],
  });

  return { isLoading, data, error };
};

export default useOrders;
