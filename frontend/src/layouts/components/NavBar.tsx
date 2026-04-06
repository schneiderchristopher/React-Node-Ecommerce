import { SwordIcon } from "lucide-react"
import { useLocation, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function NavBar() {
    const { cart } = useCart();
    const location = useLocation();
    return (
        <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 font-light tracking-[0.2em] text-xl cursor-pointer" onClick={() => window.location.href = '/'}>
                    <SwordIcon size={24} strokeWidth={1.5} />
                    <span className="uppercase">AVARITIA</span>
                </div>

                <div className="flex gap-8 items-center">
                    <NavLink
                        to="/"
                        className={`text-xs uppercase tracking-widest transition-colors ${location.pathname === '/' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Collection
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={`text-xs uppercase tracking-widest relative transition-colors ${location.pathname === '/cart' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Archive ({cart.length})
                    </NavLink>
                    <NavLink
                        to="/admin"
                        className={`text-xs uppercase tracking-widest transition-colors ${location.pathname === '/admin' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Control
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}