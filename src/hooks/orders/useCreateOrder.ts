import { createOrder } from "@/services/apiOrder";
import { CartItem } from "@/store/useCart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateOrder = () => {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: ({
      userId,
      address,
      cart,
    }: {
      userId: string;
      address: string;
      cart: CartItem[];
    }) => createOrder({ userId, address, cart }),
    onSuccess: () => {
      toast.success("Create order successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { data, mutate, isPending, error };
};

export default useCreateOrder;
