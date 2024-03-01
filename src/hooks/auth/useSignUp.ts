import { signUp as signUpApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignUp = () => {
  const navigate = useNavigate();
  const {
    error,
    mutate: signUp,
    isPending,
    data,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Signup successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  return { error, signUp, isPending, data };
};

export default useSignUp;
