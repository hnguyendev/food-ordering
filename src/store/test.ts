import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: Product) => void;
  remove: (idProduct: number) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  count: () => {
    const { cart } = get();
    if (cart.length)
      return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
    return 0;
  },
  add: (product: Product) => {
    const { cart } = get();
    const updatedCart = updateCart(product, cart);
    set({ cart: updatedCart });
  },
  remove: (idProduct: number) => {
    const { cart } = get();
    const updatedCart = removeCart(idProduct, cart);
    set({ cart: updatedCart });
  },
  removeAll: () => set({ cart: [] }),
}));

function updateCart(product: Product, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;

  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, count: item.count + 1 } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: number, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}

// check current password before updating user password
// SET search_path = extensions, public, auth;

// CREATE OR REPLACE FUNCTION public.verify_user_password(password text)
// RETURNS BOOLEAN SECURITY DEFINER AS
// $$
// DECLARE
//   user_id uuid;
// BEGIN
//   user_id := auth.uid();
//   RETURN EXISTS (
//     SELECT id
//     FROM auth.users
//     WHERE id = user_id AND encrypted_password = crypt(password::text, auth.users.encrypted_password)
//   );
// END;
// $$ LANGUAGE plpgsql;

// import { createBrowserClient } from '@supabase/ssr';

// export default function UpdatePasswordForm() {
//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   async function updatePassword(oldPassword, newPassword) {
//     // Verify the current password
//     const verifyResponse = await supabase.rpc('verify_user_password', { password: oldPassword });
//     if (verifyResponse.error) {
//       console.error(verifyResponse.error);
//       return false;
//     }

//     // Update to the new password if the old one is correct
//     if (verifyResponse.data === true) {
//       const updateResponse = await supabase.auth.updateUser({ password: newPassword });
//       return !updateResponse.error;
//     }

//     return false;
//   }

//   return <></>;
// }
