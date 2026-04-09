import { api } from "./api";

export type OrderItem = { product_id: number; quantity: number };
export type Order = {
    id: number;
    client_id: string;
    status: 'pending' | 'confirmed';
    items: OrderItem[];
};

export const orderService = {
    getAll: () => api.get<Order[]>("/orders"),

    create: (orderData: Omit<Order, "id" | "status">) =>
        api.post<{ id: number; delivery_date: string; message: string }>("/orders", orderData),

    confirm: (id: number) =>
        api.patch<void>(`/orders/${id}/confirm`, {}),
};