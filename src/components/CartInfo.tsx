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

interface CartInfoProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const CartInfo: FC<CartInfoProps> = ({ children, asChild }) => {
  const { data } = useUser();
  const userId = data?.id as string;
  const { data: newOrder, mutate } = useCreateOrder();
  const { cart, clearCart } = useCart((state) => state);

  const onCreateOrder = () => {
    if (!cart.length) return;
    mutate({ userId, cart });
  };

  return (
    <Sheet>
      <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart Info</SheetTitle>
          <SheetDescription>Confirm your order here</SheetDescription>
        </SheetHeader>

        <CartList />

        <SheetFooter className="flex flex-col gap-y-4">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
          <Button onClick={clearCart} variant="destructive">
            Clear cart
          </Button>
        </SheetFooter>
        <Button onClick={onCreateOrder}>Order</Button>
      </SheetContent>
    </Sheet>
  );
};

export default CartInfo;
