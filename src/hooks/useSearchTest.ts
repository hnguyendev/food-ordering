import { searchProducts } from "@/services/apiSearch";
import { useQuery } from "@tanstack/react-query";

const useSearchTest = (term: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["search-products", term],
    queryFn: () => searchProducts(term),
  });

  return { data, isPending };
};

export default useSearchTest;
