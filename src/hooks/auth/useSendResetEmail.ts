import { sendResetPassword } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSendResetEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendResetPassword,
    onSuccess: () => toast.success("Email sent"),
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
};

export default useSendResetEmail;
