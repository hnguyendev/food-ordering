import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Item } from "../../types.ts";
import { toast } from "sonner";

export interface CartItem extends Item {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  totalQuantity: () => number;
  totalPrice: () => number;
}

const updateCart = (cart: CartItem[], item: Item) => {
  const cartItem = { ...item, quantity: 1 } as CartItem;
  const isOnCart = cart.map((cartItem) => cartItem.id).includes(item.id);

  if (!isOnCart) {
    cart.push(cartItem);
    toast.success("Item added to cart");
  } else {
    return cart.map((cartItem) => {
      if (cartItem.id === item.id)
        return { ...cartItem, quantity: cartItem.quantity + 1 } as CartItem;
      return cartItem;
    });
  }

  return cart;
};

const removeCart = (cart: CartItem[], id: string) => {
  return cart
    .map((item) => {
      if (item.id === id) return { ...item, quantity: item.quantity - 1 };
      return item;
    })
    .filter((item) => {
      return item.quantity;
    });
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item: Item) => {
        const { cart } = get();
        const updatedCart = updateCart(cart, item);
        set({ cart: updatedCart });
      },
      removeFromCart: (id: string) => {
        const { cart } = get();
        const updatedCart = removeCart(cart, id);
        set({ cart: updatedCart });
      },
      clearCart: () => set({ cart: [] }),
      getItemQuantity: (id: string) => {
        const { cart } = get();
        const item = cart.find((item) => item.id === id);

        return item?.quantity as number;
      },
      totalQuantity: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.quantity)
            .reduce((acc, cur) => acc + cur);
        return 0;
      },
      totalPrice: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.quantity * item.unitPrice)
            .reduce((acc, cur) => acc + cur);
        return 0;
      },
    }),
    { name: "cart-storage" }
  )
);
