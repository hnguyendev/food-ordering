import { FC } from "react";
import { format } from "date-fns";
import Currency from "./Currency";
import { cn } from "@/lib/utils";
import OrderItem from "./OrderItem";

interface OrderDetailProps {
  order: {
    address: string | null;
    created_at: string;
    id: string;
    isPaid: boolean | null;
    totalPrice: number | null;
    user_id: string | null;
    order_item: {
      quantity: number | null;
      totalPrice: number | null;
      product: {
        name: string | null;
      } | null;
    }[];
  };
}

const OrderDetail: FC<OrderDetailProps> = ({ order }) => {
  return (
    <div className="border rounded-md shadow-md px-2 py-4 relative bg-background">
      <div
        className={cn(
          "absolute right-2 top-2 flex items-center justify-center bg-red-500 rounded-md px-2 py-1 drop-shadow-lg",
          order.isPaid && "bg-green-500"
        )}
      >
        <span className="text-xs font-medium text-secondary uppercase">
          {order.isPaid ? "Paid" : "Not Paid"}
        </span>
      </div>
      <div className="text-sm lg:text-base font-semibold">
        {format(new Date(order.created_at), "MMM dd yyyy")}
      </div>
      <div className="text-sm text-muted-foreground">
        Order time: {format(new Date(order.created_at), "HH:mm")}
      </div>
      <div className="text-sm text-muted-foreground truncate">
        Order address: {order.address}
      </div>

      <div className="mt-4 text-sm lg:text-base font-medium">Products:</div>
      <ul className="divide-y divide-gray-200 border-b mb-12">
        {order.order_item.map((item) => (
          <OrderItem item={item} key={item.product?.name} />
        ))}
      </ul>

      <div className="absolute bottom-1">
        <div className="text-sm lg:text-base">
          Total Price: <Currency unitPrice={order.totalPrice as number} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
