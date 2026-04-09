import { useState } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import type Product from "../../models/Product";
import { OrderSection } from "./components/OrderSection";
import { useOrder } from "../../hooks/useOrder";

type View = 'inventory' | 'orders';

export default function DashboardPage() {
    const [view, setView] = useState<View>('inventory');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { refreshOrders } = useOrder();

    const handleViewChange = (newView: View) => {
        setView(newView);
        if (newView === 'orders') {
            refreshOrders();
        }
    };

    return (
        <div className="space-y-12 max-w-7xl mx-auto pt-8">
            <div className="border-b border-zinc-800 pb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-xs uppercase tracking-[0.5em] text-zinc-500 mb-2">Controle do sistema</h2>
                    <h1 className="text-3xl font-light tracking-tight text-white">Estoque</h1>
                </div>

                <div className="flex gap-8 border border-zinc-800 p-1">
                    <button
                        onClick={() => handleViewChange('inventory')}
                        className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-colors ${view === 'inventory' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                    >
                        Inventário
                    </button>
                    <button
                        onClick={() => handleViewChange('orders')}
                        className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-colors ${view === 'orders' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                    >
                        Pedidos
                    </button>
                </div>
            </div>
            {view === 'inventory' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-500">
                    <div className="lg:col-span-4">
                        <ProductForm editingProduct={editingProduct} onClearEdit={() => setEditingProduct(null)} />
                    </div>
                    <div className="lg:col-span-8">
                        <ProductList
                            onEdit={(product) => setEditingProduct(product)}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in slide-in-from-bottom-4 duration-500">
                    <OrderSection title="Esperando aprovação" status="pending" />
                    <OrderSection title="Aprovados" status="confirmed" />
                </div>
            )}
        </div>
    );
}