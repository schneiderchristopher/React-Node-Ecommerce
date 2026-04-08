import { createContext, useState, useEffect, useMemo } from "react";
import type Product from "../models/Product";

const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Relógio de Pulso Clássico",
        description: "Elegância atemporal para o seu pulso.",
        price: 499.99,
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "Relógio de Pulso Esportivo",
        description: "Resistente e funcional para aventuras ao ar livre.",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Relógio de Pulso Minimalista",
        description: "Design clean e moderno para o dia a dia.",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
    },
];

type ProductContextType = {
    products: Product[];
    loading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    getProductById: (id: number) => Product | undefined;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        // TODO: Chamada da API para buscar produtos
        setError(null);
        try {
            setProducts(MOCK_PRODUCTS);
        } catch (err) {
            setError("Falha ao carregar produtos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getProductById = (id: number) => {
        return products.find(p => p.id === id);
    };

    const value = useMemo(() => ({
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        getProductById
    }), [products, loading, error]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}