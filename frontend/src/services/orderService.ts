import { api } from "./api";

export type OrderItem = { product_id: number; quantity: number };
export type Order = {
    id: number;
    client_id: string;
    delivery_date: string;
    status: 'pending' | 'confirmed';
    items: OrderItem[];
};

export const orderService = {
    getAll: () => api.get<Order[]>("/orders"),

    create: (orderData: Omit<Order, "id" | "status" | "delivery_date">) =>
        api.post<{ id: number; delivery_date: string; message: string }>("/orders", orderData),

    confirm: (id: number) =>
        api.patch<void>(`/orders/${id}/confirm`, {}),
};