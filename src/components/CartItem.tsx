import { CartItem as CartItemInterface, useCart } from "@/store/useCart";
import { FC } from "react";
import { cn, formatCurrency } from "@/lib/utils";

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
          <span className="font-semibold text-xs lg:text-base">
            {data.quantity}
          </span>
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
        <span className={cn("font-semibold text-xs hidden md:block")}>
          {formatCurrency.format(Number(data.unitPrice * data.quantity))}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
