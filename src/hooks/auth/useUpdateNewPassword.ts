import { updateNewPassword } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateNewPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateNewPassword,
    onSuccess: () => toast.success("Update password successfully"),
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
};

export default useUpdateNewPassword;
