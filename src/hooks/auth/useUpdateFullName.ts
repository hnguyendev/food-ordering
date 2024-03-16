import { updateUserFullName } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateFullName = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUserFullName,
    onSuccess: () => toast.success("Update full name successfully"),
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending, error };
};

export default useUpdateFullName;
