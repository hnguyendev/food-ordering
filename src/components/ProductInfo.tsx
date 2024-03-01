import { FC } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Item } from "types";
import Currency from "./Currency";
import { useCart } from "@/store/useCart";

interface ProductInfoProps {
  data: Item;
  onClose: () => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ data, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(data);
    onClose();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency unitPrice={data?.unitPrice} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>Medium</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Info:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        </div>
      </div>
      {!data.soldOut && (
        <div className="mt-10 flex items-center gap-x-3">
          <Button
            onClick={handleAddToCart}
            className="flex items-center gap-x-2"
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
