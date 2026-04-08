import { useCart } from "../../hooks/useCart";
import CartList from "./components/CartList";

export default function CartPage() {
    const { totalItems, total, clearCart } = useCart();

    function onCheckout() {
        alert("Compra feita com sucesso!");
        clearCart();
    }

    return (
        <div className="max-w-4xl mx-auto min-h-[60vh] pt-6">
            <h2 className="text-xs uppercase tracking-[0.5em] text-zinc-500 mb-12">Seu Carrinho</h2>
            {totalItems === 0 ?
                <div className="border border-zinc-900 p-20 text-center">
                    <p className="text-zinc-600 uppercase tracking-widest text-xs">
                        Carrinho vazio / Sem itens selecionados
                    </p>
                </div>
                :
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <CartList />

                    <div className="bg-zinc-900/20 border border-zinc-800 p-8 h-fit">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-8">
                            Pedido
                        </h3>

                        <div className="flex justify-between items-center mb-8 pb-8 border-b border-zinc-800">
                            <span className="text-xs uppercase tracking-widest text-zinc-400">
                                Total
                            </span>
                            <span className="text-2xl font-light">
                                R$ {total.toLocaleString('pt-BR')}
                            </span>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-300 transition-colors"
                        >
                            Confirmar Pedido
                        </button>
                    </div>

                </div>
            }
        </div>
    );
}