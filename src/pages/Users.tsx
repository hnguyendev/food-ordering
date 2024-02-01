import UpdateUserData from "@/features/auth/UpdateUserData";
import UpdateUserPassword from "@/features/auth/UpdateUserPassword";
import useUser from "@/hooks/auth/useUser";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, data } = useUser();
  const userId = data?.id as string;

  const { mutate: updateProfile } = useUpdateProfile();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone && !address) return;

    updateProfile({ id: userId, phone, address });
    setPhone("");
    setAddress("");
  };

  if (!data) return null;

  return (
    <div className="space-y-8">
      <h1 className="font-semibold text-lg md:text-2xl">Update your account</h1>
      <UpdateUserData />
      <UpdateUserPassword />
    </div>
  );
};

export default Users;
