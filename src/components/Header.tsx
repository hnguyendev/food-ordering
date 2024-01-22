import { MdOutlineLogout } from "react-icons/md";
import useLogout from "../hooks/auth/useLogout";
import Spinner from "./Spinner";
import Logo from "./Logo";
import { Button } from "./ui/button";
import useUser from "@/hooks/auth/useUser";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartInfo from "./CartInfo";
import { useCart } from "@/store/useCart";

const Header = () => {
  const { logOut, isPending } = useLogout();
  const { isAuthenticated, isLoading } = useUser();
  const { totalQuantity } = useCart((state) => state);
  const navigate = useNavigate();

  const isGuest = !isLoading && !isAuthenticated;

  return (
    <div className="bg-white h-20 px-2 lg:px-4 fixed top-0 z-50 w-full flex items-center border shadow-sm">
      <Logo />
      <div className="ml-auto flex items-center gap-x-4">
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
          <Button onClick={() => navigate("/login")} variant="primary">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
