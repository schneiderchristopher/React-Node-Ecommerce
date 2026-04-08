import { ArrowDown } from "lucide-react";
import ProductList from "./components/ProductList";
import type Product from "../../models/Product";

const productsMock: Product[] = [
    {
        id: 1,
        name: "Relógio de Pulso Clássico",
        description: "Elegância atemporal para o seu pulso.",
        price: 499.99,
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "Relógio de Pulso Esportivo",
        description: "Resistente e funcional para aventuras ao ar livre.",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Relógio de Pulso Minimalista",
        description: "Design clean e moderno para o dia a dia.",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
    },
];

export default function Home() {
    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="space-y-20">
                <section className="relative h-[60vh] flex flex-col justify-center border border-zinc-800 p-10 bg-zinc-900/30 overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-4 block">Nova Coleção / 2026</span>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 leading-none">O PADRÃO DO<br />TEMPO.</h1>
                        <p className="text-zinc-400 text-sm tracking-wide leading-relaxed mb-8 max-w-md">
                            O ápice da engenheria mecânica, com precisão até a última engrenagem. <br />
                            Funcionalidade e luxo andando lado a lado com você.
                        </p>
                        <button className="flex items-center gap-2 border border-zinc-700 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all group">
                            Explore agora a nova coleção <ArrowDown size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-zinc-800/20 to-transparent pointer-events-none" />
                </section>

                <ProductList products={productsMock} />
            </div>
        </main>
    )
}