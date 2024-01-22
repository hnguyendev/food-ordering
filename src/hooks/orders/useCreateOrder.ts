import { createOrder } from "@/services/apiOrder";
import { CartItem } from "@/store/useCart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateOrder = () => {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: ({ userId, cart }: { userId: string; cart: CartItem[] }) =>
      createOrder({ userId, cart }),
    onSuccess: () => {
      toast.success("Create order successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { data, mutate, isPending, error };
};

export default useCreateOrder;
