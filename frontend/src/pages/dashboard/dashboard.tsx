import { useState } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import type Product from "../../models/Product";

export default function DashboardPage() {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    return (
        <div className="space-y-12 max-w-7xl mx-auto pt-8">
            <div className="border-b border-zinc-800 pb-8">
                <h2 className="text-xs uppercase tracking-[0.5em] text-zinc-500 mb-2">Controle do sistema</h2>
                <h1 className="text-3xl font-light tracking-tight text-white">Estoque</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <div className="lg:col-span-4">
                    <ProductForm
                        editingProduct={editingProduct}
                        onClearEdit={() => setEditingProduct(null)}
                    />
                </div>

                <div className="lg:col-span-8">
                    <ProductList
                        onEdit={(product) => setEditingProduct(product)}
                    />
                </div>

            </div>
        </div>
    );
}