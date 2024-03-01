import { Button } from "./ui/button";
import { ShoppingCart, Expand } from "lucide-react";
import { useCart } from "@/store/useCart";
import { cn } from "@/lib/utils";
import Currency from "./Currency";
import usePreviewModal from "@/store/usePreviewModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ data }: { data: any }) => {
  const { cart, addToCart, removeFromCart, getItemQuantity } = useCart(
    (state) => state
  );
  const isOnCart = cart.map((item) => item.id).includes(data.id);
  const { onOpen } = usePreviewModal();

  return (
    <div className="group bg-white cursor-pointer rounded-lg border p-3 space-y-4 shadow-md relative">
      <div className="aspect-square rounded-lg bg-gray-100 relative overflow-hidden inline-block">
        <img
          alt={data.name}
          src={data.imageUrl}
          className={cn(
            "aspect-square object-cover rounded-md group-hover:opacity-80 group-hover:scale-110 transition-transform",
            data.soldOut && "opacity-70 grayscale"
          )}
        />
        <div className="opacity-0 group-hover:opacity-100 w-full transition absolute bottom-3">
          <div className="flex gap-x-4 lg:gap-x-6 justify-center">
            <Button size="card" onClick={() => onOpen(data)}>
              <Expand color="white" />
            </Button>
            {!data.soldOut && (
              <Button size="card" onClick={() => addToCart(data)}>
                <ShoppingCart color="white" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-sm md:text-lg truncate">{data.name}</p>
          <Currency className="text-xs md:text-lg" unitPrice={data.unitPrice} />
        </div>
        {data.soldOut && (
          <p className="text-xs md:text-lg uppercase font-bold">Sold out</p>
        )}
      </div>
      {isOnCart && (
        <div className="hidden absolute lg:flex items-center gap-x-2 bottom-1 right-2">
          <Button onClick={() => removeFromCart(data.id)} size="quantity">
            -
          </Button>
          <span className="text-sm font-semibold">
            {getItemQuantity(data.id)}
          </span>
          <Button onClick={() => addToCart(data)} size="quantity">
            +
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
