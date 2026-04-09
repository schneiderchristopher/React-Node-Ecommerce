import { createContext, useState, useEffect } from "react";
import { orderService, type Order } from "../services/orderService";

type OrderContextType = {
    orders: Order[];
    loading: boolean;
    confirmOrder: (id: number) => Promise<void>;
    refreshOrders: () => Promise<void>;
};

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await orderService.getAll();
            setOrders(data);
        } catch (err) {
            console.error("Erro ao carregar pedidos", err);
        } finally {
            setLoading(false);
        }
    };

    const confirmOrder = async (id: number) => {
        try {
            await orderService.confirm(id);
            setOrders(prev => prev.map(o =>
                o.id === id ?
                    { ...o, status: 'confirmed' } : o
            ));
        } catch (err) {
            alert("Erro ao confirmar pedido");
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    return <OrderContext.Provider value={{ orders, loading, confirmOrder, refreshOrders: fetchOrders }}>{children}</OrderContext.Provider>;
}