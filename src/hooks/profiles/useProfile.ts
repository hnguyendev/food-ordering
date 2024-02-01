import { getProfile } from "@/services/apiProfile";
import { useQuery } from "@tanstack/react-query";
import useUser from "../auth/useUser";

const useProfile = () => {
  const { data: user } = useUser();

  const {
    data: profile,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user?.id as string),
  });

  return { profile, isLoading, isFetching, error };
};

export default useProfile;
