import { Edit, Trash2 } from "lucide-react";
import type Product from "../../../models/Product";

type ProductItemProps = {
    product: Product;
    onEdit: (product: Product) => void;
};

export function ProductItem({ product, onEdit }: ProductItemProps) {
    const handleDelete = () => {
        if (confirm("Tem certeza que deseja remover este registro?")) {
            // TODO: Chamar o context para deletar o produto
            console.log("Deletar produto com ID:", product.id);
        }
    };

    return (
        <tr className="border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors">
            <td className="p-6">
                <div className="flex items-center gap-4">
                    <img
                        src={product.imageUrl}
                        className="w-12 h-12 grayscale object-cover border border-zinc-800"
                        alt={product.name}
                    />
                    <div>
                        <p className="font-bold text-white">{product.name}</p>
                        <p className="text-[10px] text-zinc-600 truncate max-w-50">
                            {product.description}
                        </p>
                    </div>
                </div>
            </td>
            <td className="p-6 font-mono">
                R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </td>
            <td className="p-6 text-right">
                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => onEdit(product)}
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="Editar Registro"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-zinc-500 hover:text-red-800 transition-colors"
                        title="Deletar Registro"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}