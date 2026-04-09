import { api } from "./api";
import type Product from "../models/Product";

export const productService = {
    getAll: () => api.get<Product[]>("/products"),

    create: (productData: Omit<Product, "id">) =>
        api.post<{ id: number; message: string }>("/products", productData),

    update: (id: number, productData: Omit<Product, "id">) =>
        api.put<{ message: string }>(`/products/${id}`, productData),

    remove: (id: number) =>
        api.delete<{ message: string }>(`/products/${id}`),
};