import supabase from "./supabase";

export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Cannot get user profile");
  }

  return data;
};

export const updateProfile = async ({
  id,
  phone,
  address,
}: {
  id: string;
  phone: string;
  address: string;
}) => {
  let updateData;

  if (phone) updateData = { phone };
  if (address) updateData = { ...updateData, address };

  const { data, error } = await supabase
    .from("profiles")
    .update({ phone: updateData?.phone, address: updateData?.address })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
