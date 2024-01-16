import supabase from "./supabase";

export const getOrders = async (id: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot get orders");
  }

  return data;
};
