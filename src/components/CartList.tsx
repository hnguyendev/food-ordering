import { useCart } from "@/store/useCart";
import Currency from "./Currency";

const CartList = () => {
  const { cart, getItemQuantity, totalQuantity, totalPrice } = useCart(
    (state) => state
  );
  return (
    <div className="flex flex-col gap-y-6 py-4">
      <ul className="space-y-4">
        {cart.map((item) => (
          <li className="flex items-center gap-x-4" key={item.id}>
            <p>{item.name}</p>
            <p>x{getItemQuantity(item.id)}</p>
          </li>
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
