import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../../../context/CartContext";
import { useCart } from "../../../hooks/useCart";

interface CartItemProps extends CartItem { };

export default function CartItem({ id, name, price, description, imageUrl, quantity }: CartItemProps) {
    const { removeOneItemFromCart, removeAllItemFromCart, addToCart } = useCart();

    return (
        <div key={id} className="flex items-center gap-6 p-6 bg-zinc-950 group">
            <img src={imageUrl} alt={name} className="w-20 h-20 grayscale" />
            <div className="flex-1">
                <h4 className="text-sm uppercase tracking-widest font-light">
                    {name}
                </h4>
                <p className="text-zinc-500 text-sm">
                    R$ {price.toLocaleString('pt-BR')} cada
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                    Quantidade: {quantity}
                </p>
                <p className="text-zinc-300 text-lg mt-1">
                    R$ {(price * quantity).toLocaleString('pt-BR')}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => removeOneItemFromCart(id)}
                    className="text-zinc-700 hover:text-white transition-colors"
                >
                    <Minus size={16} />
                </button>
                <button
                    onClick={() => addToCart({ id, name, price, description, imageUrl })}
                    className="text-zinc-700 hover:text-white transition-colors">
                    <Plus size={16} />
                </button>
                <button
                    onClick={() => removeAllItemFromCart(id)}
                    className="text-zinc-700 hover:text-red-500 transition-colors ml-2"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    )
}