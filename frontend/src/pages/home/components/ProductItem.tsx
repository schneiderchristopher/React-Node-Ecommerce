import { Plus } from "lucide-react";
import type Product from "../../../models/Product";
import { useCart } from "../../../hooks/useCart";

interface ProductProps extends Product { };

export default function ProductItem({ id, name, price, description, imageUrl }: ProductProps) {
    const { addToCart } = useCart();
    return (
        <div className="bg-zinc-950 p-8 group hover:bg-zinc-900/50 transition-colors">
            <div className="aspect-4/5 bg-zinc-900 mb-8 overflow-hidden relative">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <button
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-none opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-200"
                    onClick={() => addToCart({ id, name, price, description, imageUrl })}
                >
                    <Plus size={20} />
                </button>
            </div>
            <h3 className="text-lg font-light tracking-tight mb-1">{name}</h3>
            <p className="text-zinc-500 text-[11px] uppercase tracking-wider mb-4 h-8 overflow-hidden">{description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                <span className="text-xl font-light">R$ {price.toLocaleString('pt-BR')}</span>
            </div>
        </div>
    );
}