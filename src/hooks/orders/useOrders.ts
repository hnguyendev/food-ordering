import { getOrders } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

const useOrders = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getOrders(id),
    queryKey: ["orders"],
    retry: false,
  });

  return { isLoading, data, error };
};

export default useOrders;
