import { FC } from "react";
import Currency from "./Currency";

interface OrderItemProps {
  item: {
    quantity: number | null;
    totalPrice: number | null;
    product: {
      name: string | null;
    } | null;
  };
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{item.quantity}&times;</span>{" "}
          {item.product?.name}
        </p>
        <p className="font-bold">
          <Currency unitPrice={item.totalPrice as number} />
        </p>
      </div>
    </li>
  );
};

export default OrderItem;
