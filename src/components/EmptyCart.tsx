import { Button } from "./ui/button";
import { SheetClose } from "./ui/sheet";

const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <img src="./empty.png" alt="empty-cart" className="h-60 w-60" />

      <div className="flex flex-col text-center">
        <span className="font-semibold text-lg">Start picking food</span>
        <span className="text-sm text-muted-foreground">
          Add items to your cart and place order here
        </span>
      </div>
      <SheetClose asChild>
        <Button type="submit" variant="link">
          Continue browsing
        </Button>
      </SheetClose>
    </div>
  );
};

export default EmptyCart;
