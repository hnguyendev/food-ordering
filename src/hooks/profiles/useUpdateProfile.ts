import { updateProfile } from "@/services/apiProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Update profile successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending, error };
};
export default useUpdateProfile;
