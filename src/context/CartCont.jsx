import { createContext, useEffect, useState } from 'react'
export const CartContext = createContext(); 
export default function CartContextProvider({ children }) {
    const [retCart, setRetCart] = useState();
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    return <CartContext.Provider value={{retCart, setRetCart,numberOfProducts,setNumberOfProducts}}>
        {children}
    </CartContext.Provider>
}
