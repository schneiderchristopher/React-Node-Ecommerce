import { createContext, useMemo, useState } from "react";
import type Product from "../models/Product";

export type CartItem = Product & {
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    total: number;
    totalItems: number;
    addToCart: (item: Product) => void;
    clearCart: () => void;
    removeOneItemFromCart: (itemId: number) => void;
    removeAllItemFromCart: (itemId: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Utilização de useMemo para calcular o total apenas quando o carrinho for atualizado
    // Evita cálculos desnecessários em re-renderizações, como quando o usuário interage com outros componentes.
    // Não é necessário em aplicações pequenas como essa ou nesse caso, utilizei apenas para demonstrar boas práticas.
    const total = useMemo(() => {
        return cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
    }, [cart]);


    const totalItems = useMemo(() => {
        return cart.reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);
    }, [cart]);

    function addToCart(item: Product) {
        setCart((prev) => {
            const existing = prev.find(p => p.id === item.id);

            if (existing) {
                return prev.map(p =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    }

    function clearCart() {
        setCart([]);
    }

    function removeOneItemFromCart(itemId: number) {
        setCart((prev) => {
            return prev
                .map(item =>
                    item.id === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);
        });
    }

    function removeAllItemFromCart(itemId: number) {
        setCart(prev => prev.filter(item => item.id !== itemId));
    }

    return (
        <CartContext.Provider value={{ cart, total, totalItems, addToCart, clearCart, removeOneItemFromCart, removeAllItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
}