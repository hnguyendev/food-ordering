import { updatePassword } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdatePassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => toast.success("Update password successfully"),
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
};

export default useUpdatePassword;
