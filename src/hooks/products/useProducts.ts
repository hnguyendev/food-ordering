import { getProducts } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading, error };
};

export default useProducts;
