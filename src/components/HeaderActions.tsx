import { ShoppingBag } from "lucide-react";
import CartInfo from "./CartInfo";
import { Button } from "./ui/button";
import useLogout from "@/hooks/auth/useLogout";
import useUser from "@/hooks/auth/useUser";
import { useCart } from "@/store/useCart";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { MdOutlineLogout } from "react-icons/md";

const HeaderActions = () => {
  const { logOut, isPending } = useLogout();
  const { isAuthenticated, isLoading } = useUser();
  const { totalQuantity } = useCart((state) => state);
  const navigate = useNavigate();

  const isGuest = !isLoading && !isAuthenticated;

  return (
    <div className="ml-4 flex items-center gap-x-4">
      <CartInfo asChild>
        <Button className="flex gap-x-2">
          <ShoppingBag size={20} color="white" />
          <span className="text-sm font-medium text-white">
            {totalQuantity()}
          </span>
        </Button>
      </CartInfo>
      {!isGuest && (
        <div className="flex items-center justify-end">
          <Button variant="link" onClick={() => logOut()}>
            <span className="mr-1">Sign out</span>
            {isPending ? <Spinner /> : <MdOutlineLogout />}
          </Button>
        </div>
      )}
      {isGuest && (
        <Button onClick={() => navigate("/login")} variant="secondary">
          Login
        </Button>
      )}
    </div>
  );
};

export default HeaderActions;
