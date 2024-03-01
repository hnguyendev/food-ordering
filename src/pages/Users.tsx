import UpdateUserData from "@/features/auth/UpdateUserData";
import UpdateUserPassword from "@/features/auth/UpdateUserPassword";
import useUser from "@/hooks/auth/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, data } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!data) return null;

  return (
    <div className="space-y-8">
      <h1 className="font-semibold text-lg md:text-2xl">Update your account</h1>
      <div className="flex flex-col items-center justify-center gap-y-6 w-full">
        <UpdateUserData />
        <UpdateUserPassword />
      </div>
    </div>
  );
};

export default Users;
