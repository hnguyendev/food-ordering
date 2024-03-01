import { getFoods } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

const useFood = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["food"],
    queryFn: getFoods,
  });

  return { data, isLoading, error };
};

export default useFood;
