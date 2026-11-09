import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'ff_cart_v1';
const DELIVERY_FEE = 199;
const FREE_DELIVERY_OVER = 2500;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity,
        },
      ];
    });
    setPulseKey((key) => key + 1);
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((entry) => entry.id !== id)
        : prev.map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const subtotal = items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
    return {
      items,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      freeDeliveryOver: FREE_DELIVERY_OVER,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      pulseKey,
    };
  }, [items, addItem, setQuantity, removeItem, clearCart, isOpen, openCart, closeCart, pulseKey]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}

export const formatPKR = (value) => `Rs. ${new Intl.NumberFormat('en-PK').format(value)}`;