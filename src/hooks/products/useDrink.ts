import { getDrinks } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

const useDrink = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["food"],
    queryFn: getDrinks,
  });

  return { data, isLoading, error };
};

export default useDrink;
