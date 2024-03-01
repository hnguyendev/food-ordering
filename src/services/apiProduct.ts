import supabase from "./supabase";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const getFoods = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("groupId", "2bf9a5cb-7710-45da-92ed-599534673971");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const getDrinks = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("groupId", "705f7f8c-d534-451a-9577-35be234defdb");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
