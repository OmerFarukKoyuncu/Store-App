import { createContext, useContext, useState } from "react";

//createContext ile genel ayalar için context yapısı oluşturuyoruz.Provider ilede hangi componentlerin erişebilieceğini belirtiyoruz.
//children olarak göndereceğimiz syfalar componentler erişebliecek.
export const CartContext = createContext();

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  return (
    //value içine dışarıdan erişilebilebilecek olanları yazıyoruz
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
