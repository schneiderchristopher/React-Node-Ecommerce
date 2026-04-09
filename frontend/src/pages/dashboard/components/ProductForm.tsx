import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type Product from "../../../models/Product";
import { useProduct } from "../../../hooks/useProduct";

type ProductFormProps = {
    editingProduct: Product | null;
    onClearEdit: () => void;
};

export function ProductForm({ editingProduct, onClearEdit }: ProductFormProps) {
    const { addProduct, updateProduct } = useProduct();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                price: editingProduct.price.toString(),
                description: editingProduct.description,
                imageUrl: editingProduct.imageUrl
            });
        } else {
            setFormData({ name: "", price: "", description: "", imageUrl: "" });
        }
    }, [editingProduct]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productPayload = {
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            imageUrl: formData.imageUrl
        };

        if (editingProduct && editingProduct.id) {
            await updateProduct(editingProduct.id, productPayload);
        } else {
            await addProduct(productPayload);
        }

        onClearEdit();
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 p-8 h-fit sticky top-28">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-8">
                {editingProduct ? 'Editar' : 'Novo Registro'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Nome</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-sm text-white focus:border-zinc-500 outline-none transition-colors"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Preço</label>
                    <input
                        type="number"
                        required
                        step="0.01"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-sm text-white focus:border-zinc-500 outline-none transition-colors"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Descrição</label>
                    <textarea
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-sm text-white focus:border-zinc-500 outline-none h-32 resize-none"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500">URL da Imagem</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3 text-sm text-white focus:border-zinc-500 outline-none transition-colors"
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                </div>
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-white text-black py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors"
                    >
                        {editingProduct ? 'Update Record' : 'Create Record'}
                    </button>

                    {editingProduct && (
                        <button
                            type="button"
                            onClick={onClearEdit}
                            className="bg-zinc-800 text-white p-3 hover:bg-zinc-700 transition-colors flex items-center justify-center"
                            title="Cancelar Edição"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}