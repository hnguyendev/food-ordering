import React, { FC, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "./ui/sheet";
import { Button } from "./ui/button";
import CartList from "./CartList";
import { useCart } from "@/store/useCart";
import useUser from "@/hooks/auth/useUser";
import useCreateOrder from "@/hooks/orders/useCreateOrder";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import AddressInput from "./AddressInput";

interface CartInfoProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const CartInfo: FC<CartInfoProps> = ({ children, asChild }) => {
  const { data, isAuthenticated, isLoading } = useUser();
  const userId = data?.id as string;
  const isGuest = !isLoading && !isAuthenticated;

  const { mutate } = useCreateOrder();
  const { cart, clearCart } = useCart((state) => state);

  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const onCreateOrder = () => {
    if (!cart.length || isGuest) return;
    mutate({ userId, address, cart }, { onSuccess: () => clearCart() });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
        <SheetContent side="custom" className="overflow-auto">
          {cart.length ? (
            <>
              <SheetHeader>
                <SheetTitle className="text-center">Cart Info</SheetTitle>
                <SheetDescription className="text-center">
                  Confirm your order
                </SheetDescription>
              </SheetHeader>

              <AddressInput address={address} setAddress={setAddress} />

              <CartList />

              <SheetFooter className="flex flex-col gap-y-4">
                {isGuest ? (
                  <Button
                    onClick={() => navigate("/login")}
                    className="mr-auto"
                  >
                    Login to create order
                  </Button>
                ) : (
                  <Button
                    onClick={onCreateOrder}
                    className="md:mr-auto "
                    size="sm"
                  >
                    Order
                  </Button>
                )}

                <SheetClose asChild>
                  <Button type="submit" size="sm">
                    Save changes
                  </Button>
                </SheetClose>
                <Button onClick={clearCart} variant="destructive" size="sm">
                  Clear cart
                </Button>
              </SheetFooter>
            </>
          ) : (
            <EmptyCart />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartInfo;
