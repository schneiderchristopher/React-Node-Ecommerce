import { createContext, useMemo, useState } from "react";
import type Product from "../models/Product";
import { orderService } from "../services/orderService";

export type CartItem = Product & {
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    total: number;
    totalItems: number;
    isCheckingOut: boolean;
    addToCart: (item: Product) => void;
    clearCart: () => void;
    removeOneItemFromCart: (itemId: number) => void;
    removeAllItemFromCart: (itemId: number) => void;
    checkout: (clientId: string) => Promise<{ id: number, delivery_date: string; message: string }>;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

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

    async function checkout(clientId: string) {
        setIsCheckingOut(true);
        try {
            const itemsToOrder = cart.map(item => ({
                product_id: item.id as number,
                quantity: item.quantity
            }));

            const response = await orderService.create({
                client_id: clientId,
                items: itemsToOrder
            });
            clearCart();

            return response;
        } catch (error) {
            console.error("Erro no checkout:", error);
            throw error;
        } finally {
            setIsCheckingOut(false);
        }
    }

    return (
        <CartContext.Provider value={{
            cart, total, totalItems, isCheckingOut,
            addToCart, clearCart, removeOneItemFromCart, removeAllItemFromCart, checkout
        }}>
            {children}
        </CartContext.Provider>
    );
}