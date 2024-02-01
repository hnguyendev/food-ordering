import React, { FC } from "react";
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

  const onCreateOrder = () => {
    if (!cart.length || isGuest) return;
    mutate({ userId, cart }, { onSuccess: () => clearCart() });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
        <SheetContent side="custom" className="overflow-auto">
          {cart.length ? (
            <>
              <SheetHeader>
                <SheetTitle>Cart Info</SheetTitle>
                <SheetDescription>Confirm your order</SheetDescription>
              </SheetHeader>

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
                  <Button onClick={onCreateOrder} className="mr-auto">
                    Order
                  </Button>
                )}

                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
                <Button onClick={clearCart} variant="destructive">
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
