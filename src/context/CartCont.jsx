import { createContext, useEffect, useState } from 'react'
export const CartContext = createContext(); 
export default function CartContextProvider({ children }) {
    const [retCart, setRetCart] = useState();
    return <CartContext.Provider value={{retCart, setRetCart}}>
        {children}
    </CartContext.Provider>
}
