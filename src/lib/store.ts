import { create } from "zustand";

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const { items } = get();

    // Check if the same product with same size/color already exists
    const existingIndex = items.findIndex(
      (i) =>
        i.productId === item.productId &&
        i.size === item.size &&
        i.color === item.color
    );

    if (existingIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1,
      };
      set({ items: updatedItems });
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.size || "default"}-${item.color || "default"}-${Date.now()}`,
        quantity: 1,
      };
      set({ items: [...items, newItem] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const updatedItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ items: updatedItems });
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  openCart: () => {
    set({ isOpen: true });
  },

  closeCart: () => {
    set({ isOpen: false });
  },

  total: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  itemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
