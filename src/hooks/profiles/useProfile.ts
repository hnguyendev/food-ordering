import { getProfile } from "@/services/apiProfile";
import { useQuery } from "@tanstack/react-query";

const useProfile = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(id),
  });

  return { data, isLoading, error };
};

export default useProfile;
