import type Product from "../../../models/Product";
import ProductItem from "./ProductItem";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {

    return (
        <section>
            <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-6">
                <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold">Curated Catalog</h2>
                <span className="text-[10px] text-zinc-600 uppercase">{products.length} Items</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                {products.map(product => (
                    <ProductItem
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.imageUrl} />
                ))}
            </div>
        </section>
    );
}

