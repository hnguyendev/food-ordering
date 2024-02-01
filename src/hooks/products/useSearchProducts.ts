import { searchProducts } from "@/services/apiSearch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSearchProducts = () => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: searchProducts,
    onError: (err) => toast.error(err.message),
  });

  return { data, mutate, isPending };
};

export default useSearchProducts;
