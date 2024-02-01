import { CartItem as CartItemInterface, useCart } from "@/store/useCart";
import React, { FC } from "react";
import Currency from "./Currency";

interface CartItemProps {
  data: CartItemInterface;
}

const CartItem: FC<CartItemProps> = ({ data }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="flex gap-x-4 items-center border-b border-gray-100 p-1 lg:p-3">
      <div className="grid grid-cols-4 space-x-2 items-center w-full">
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => removeFromCart(data.id)}
            className="text-purple-500"
          >
            -
          </button>
          <span className="font-semibold">{data.quantity}</span>
          <button onClick={() => addToCart(data)} className="text-purple-500">
            +
          </button>
        </div>
        <img
          alt={data.name}
          src={data.imageUrl}
          className=" h-10 md:h-16 object-cover object-center aspect-square"
        />
        <p className="font-semibold text-xs">{data.name}</p>
        <Currency
          unitPrice={data.unitPrice}
          className="text-xs hidden md:block"
        />
      </div>
    </div>
  );
};

export default CartItem;
