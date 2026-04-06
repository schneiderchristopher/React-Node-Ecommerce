import { createContext, useState } from "react";
import type Product from "../models/Product";

type CartContextType = {
    cart: Product[];
    addToCart: (item: Product) => void;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    function addToCart(item: Product) {
        setCart((prev) => [...prev, item]);
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}