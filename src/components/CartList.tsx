import { useCart } from "@/store/useCart";
import Currency from "./Currency";
import CartItem from "./CartItem";

const CartList = () => {
  const { cart, totalQuantity, totalPrice } = useCart((state) => state);
  return (
    <div className="flex flex-col gap-y-6 py-4">
      <ul className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </ul>
      <span>Total Quantity: {totalQuantity()}</span>
      <span>
        Total price <Currency unitPrice={totalPrice()} />
      </span>
    </div>
  );
};

export default CartList;
