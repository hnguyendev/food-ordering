import supabase from "./supabase";

export const searchProducts = async (term: string) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .textSearch("name", term, {
      type: "websearch",
      config: "english",
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
