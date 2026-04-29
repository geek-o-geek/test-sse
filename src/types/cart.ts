export type CartItem = {
  id: number;
  name: string;
  price?: number;
  quantity: number;
};

export type CartState = {
  cart: CartItem[];

  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;

  totalItems: () => number;
};
