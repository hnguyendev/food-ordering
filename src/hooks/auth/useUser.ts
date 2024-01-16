import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    data,
    isLoading,
    error,
    isAuthenticated: data?.role === "authenticated",
  };
};

export default useUser;
