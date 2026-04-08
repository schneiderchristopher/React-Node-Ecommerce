
import { useProduct } from "../../../hooks/useProduct";
import { ProductItem } from "./ProductItem";
import type Product from "../../../models/Product";

type ProductListProps = {
    onEdit: (product: Product) => void;
};

export function ProductList({ onEdit }: ProductListProps) {
    const { products, loading, error } = useProduct();

    if (loading) {
        return <div className="p-8 text-zinc-500 uppercase tracking-widest text-xs">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-500 uppercase tracking-widest text-xs">Erro: {error}</div>;
    }

    return (
        <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
            <table className="w-full text-left text-xs uppercase tracking-wider">
                <thead>
                    <tr className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-500">
                        <th className="p-6 font-bold">Nome</th>
                        <th className="p-6 font-bold">Valor</th>
                        <th className="p-6 font-bold text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-zinc-300">
                    {products.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <div className="p-20 text-center text-zinc-700 italic text-[10px]">
                    Nenhum produto encontrado. Adicione um novo registro para começar.
                </div>
            )}
        </div>
    );
}