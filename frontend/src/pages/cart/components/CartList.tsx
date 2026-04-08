import { useCart } from "../../../hooks/useCart";
import CartItem from "./CartItem";

interface CartListProps { }

export default function CartList({ }: CartListProps) {
    const { cart } = useCart();

    return (
        <div className="lg:col-span-2 space-y-px">
            {cart.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
        </div>
    );
}
