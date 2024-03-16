import supabase from "./supabase";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Incorrect email or password!");

  return data;
};

export const signUp = async ({
  fullName,
  email,
  phone,
  password,
}: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        phone,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const updateUserFullName = async (fullName: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { fullName },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updatePassword = async ({
  password,
  oldPassword,
}: {
  password: string;
  oldPassword: string;
}) => {
  const { data, error } = await supabase.rpc("verify_user_password", {
    password: oldPassword,
  });

  if (error) {
    throw new Error("Wrong current password");
  }

  if (data === true) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  throw new Error("Wrong current password");
};

export const updateNewPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
};

const URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_DEPLOY_URL
    : import.meta.env.VITE_DEV_URL;

console.log(URL);

export const sendResetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${URL}new-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
