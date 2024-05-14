import { createContext, useEffect, useState } from 'react'
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
    const numberOfProductsStored = parseInt((localStorage.getItem("numberOfProducts") == null || localStorage.getItem("numberOfProducts") == undefined) ? 0 : localStorage.getItem("numberOfProducts"));
    const [retCart, setRetCart] = useState();
    const [numberOfProducts, setNumberOfProducts] = useState(numberOfProductsStored);
    useEffect(() => {
        localStorage.setItem("numberOfProducts", numberOfProducts)
    }, [numberOfProducts])
    return <CartContext.Provider value={{ retCart, setRetCart, numberOfProducts, setNumberOfProducts }}>
        {children}
    </CartContext.Provider>
}
