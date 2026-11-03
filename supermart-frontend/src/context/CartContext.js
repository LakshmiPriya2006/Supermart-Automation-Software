import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item: if exists, increase qty; else add with qty=1
  const addItem = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);
      if (exist) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p._id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0) // remove if qty becomes 0
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, p) => sum + Number(p.price) * p.qty, 0);
  const totalQty = cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        incrementQty,
        decrementQty,
        removeItem,
        clearCart,
        totalAmount,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

