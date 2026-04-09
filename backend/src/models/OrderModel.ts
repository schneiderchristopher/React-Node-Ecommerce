import { getDb } from '../db/database';

export interface OrderItem {
    product_id: number;
    quantity: number;
}

export interface Order {
    id?: number;
    client_id: string;
    delivery_date: string;
    status: 'pending' | 'confirmed';
    items?: OrderItem[];
}

export const OrderModel = {
    async getAll(): Promise<Order[]> {
        const db = await getDb();

        const orders = await db.all<Order[]>('SELECT * FROM Orders ORDER BY id DESC');

        for (const order of orders) {
            order.items = await db.all<OrderItem[]>(
                'SELECT product_id, quantity FROM OrderItems WHERE order_id = ?',
                [order.id]
            );
        }

        return orders;
    },

    async create(order: Order, items: OrderItem[]): Promise<number> {
        const db = await getDb();

        await db.exec('BEGIN TRANSACTION');

        try {
            const result = await db.run(
                'INSERT INTO Orders (client_id, delivery_date, status) VALUES (?, ?, ?)',
                [order.client_id, order.delivery_date, 'pending']
            );

            const orderId = result.lastID!;

            const insertOrderItemStmt = await db.prepare('INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)');

            for (const item of items) {
                await insertOrderItemStmt.run([orderId, item.product_id, item.quantity]);
            }

            await insertOrderItemStmt.finalize();

            await db.exec('COMMIT');
            return orderId;

        } catch (error) {
            await db.exec('ROLLBACK');
            throw error;
        }
    },

    async confirmOrder(id: number): Promise<void> {
        const db = await getDb();
        await db.run("UPDATE Orders SET status = 'confirmed' WHERE id = ?", [id]);
    }
};