import { CartItem } from "@/store/useCart";
import supabase from "./supabase";

export const getOrders = async (id: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, products (name)")
    .eq("user_id", id);

  if (error) {
    throw new Error("Cannot get orders");
  }

  return data;
};

export const createOrder = async ({
  userId,
  cart,
}: {
  userId: string;
  cart: CartItem[];
}) => {
  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0
  );
  const { data, error: orderError } = await supabase
    .from("orders")
    .upsert({ totalPrice, user_id: userId })
    .select()
    .single();

  if (orderError) {
    throw new Error("Cannot create order");
  }

  cart.map(async (item) => {
    const { data: orderItem } = await supabase.from("order_item").upsert({
      order_id: data.id,
      product_id: item.id,
      quantity: item.quantity,
      totalPrice: item.quantity * item.unitPrice,
    });

    return orderItem;
  });

  return data;
};
