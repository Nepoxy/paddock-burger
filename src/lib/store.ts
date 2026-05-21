import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderMode = "delivery" | "pickup" | null;

export type CartItem = {
  uid: string;
  productId: string;
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  options?: { label: string; value: string }[];
  type: "burger" | "drink" | "side" | "sauce";
};

type State = {
  mode: OrderMode;
  zip: string | null;
  zipValid: boolean;
  items: CartItem[];
  setMode: (m: OrderMode) => void;
  setZip: (z: string, valid: boolean) => void;
  addItem: (item: Omit<CartItem, "uid" | "quantity"> & { quantity?: number }) => void;
  removeItem: (uid: string) => void;
  updateQty: (uid: string, q: number) => void;
  clear: () => void;
};

export const useOrderStore = create<State>()(
  persist(
    (set) => ({
      mode: null,
      zip: null,
      zipValid: false,
      items: [],
      setMode: (mode) => set({ mode }),
      setZip: (zip, zipValid) => set({ zip, zipValid }),
      addItem: (item) =>
        set((s) => ({
          items: [
            ...s.items,
            { ...item, uid: crypto.randomUUID(), quantity: item.quantity ?? 1 },
          ],
        })),
      removeItem: (uid) =>
        set((s) => ({ items: s.items.filter((i) => i.uid !== uid) })),
      updateQty: (uid, q) =>
        set((s) => ({
          items: s.items.map((i) => (i.uid === uid ? { ...i, quantity: Math.max(1, q) } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "scuderia-order" },
  ),
);
