import { CheckCircle } from "lucide-react";
import { useOrder } from "../../../hooks/useOrder";

type OrderSectionProps = {
    title: string;
    status: 'pending' | 'confirmed';
};

export function OrderSection({ title, status }: OrderSectionProps) {
    const { orders, confirmOrder, loading } = useOrder();

    const filteredOrders = orders.filter(o => o.status === status);

    if (loading) return <div className="p-4 text-zinc-500 text-[10px]">Carregando pedidos...</div>;

    return (
        <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 border-b border-zinc-800 pb-4">
                {title} ({filteredOrders.length})
            </h3>

            <div className="grid gap-4">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-zinc-950 border border-zinc-800 p-6 flex justify-between items-center group hover:border-zinc-600 transition-colors">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-white font-mono text-sm">#ORDEM-{order.id}</span>
                                <span className="text-zinc-600 text-[10px] uppercase tracking-widest">{order.client_id}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                                Entrega Prevista: {new Date(order.delivery_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] text-zinc-600 uppercase mb-1">Items</p>
                                <p className="text-white text-xs font-bold">{order.items.reduce((acc, i) => acc + i.quantity, 0)}</p>
                            </div>

                            {status === 'pending' ? (
                                <button
                                    onClick={() => confirmOrder(order.id)}
                                    className="bg-zinc-800 text-white p-2 hover:bg-white hover:text-black transition-all"
                                    title="Aprovar Pedido"
                                >
                                    <CheckCircle size={18} />
                                </button>
                            ) : (
                                <div className="text-emerald-500/50">
                                    <CheckCircle size={18} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="py-12 text-center border border-dashed border-zinc-900 text-zinc-700 text-[10px] uppercase">
                        {status === 'pending' ? 'Nenhum pedido pendente no momento' : 'Nenhum pedido confirmado no momento'}
                    </div>
                )}
            </div>
        </div>
    );
}