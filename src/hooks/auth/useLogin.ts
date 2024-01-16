import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Login successfully");
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isPending, error };
};

export default useLogin;
