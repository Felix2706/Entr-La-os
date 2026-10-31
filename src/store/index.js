import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, options = {}) => {
        const { size, color, quantity = 1 } = options;
        const itemId = `${product.id}-${size || 'default'}-${color || 'default'}`;
        
        set((state) => {
          const existing = state.items.find(item => item.itemId === itemId);
          if (existing) {
            return {
              items: state.items.map(item =>
                item.itemId === itemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, {
              itemId,
              product,
              size,
              color,
              quantity,
            }],
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.itemId !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.itemId === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'entrelacos-cart',
    }
  )
);

export const useOrderStore = create(
  persist(
    (set) => ({
      orderData: null,
      orderId: null,

      setOrderData: (data) => set({ orderData: data }),
      
      generateOrderId: () => {
        const id = `EL${Date.now().toString().slice(-6)}`;
        set({ orderId: id });
        return id;
      },
      
      clearOrder: () => set({ orderData: null, orderId: null }),
    }),
    {
      name: 'entrelacos-order',
    }
  )
);
