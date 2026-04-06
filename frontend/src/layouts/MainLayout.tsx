import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-700">
            <NavBar cartLength={0} />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}