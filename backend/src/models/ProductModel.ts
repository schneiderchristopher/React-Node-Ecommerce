import { getDb } from '../db/database';

export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
}

export const ProductModel = {
    async getAll(): Promise<Product[]> {
        const db = await getDb();
        return db.all<Product[]>('SELECT * FROM Products');
    },

    async create(product: Product): Promise<number | undefined> {
        const db = await getDb();
        const result = await db.run(
            'INSERT INTO Products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [product.name, product.price, product.description, product.imageUrl]
        );
        return result.lastID;
    },

    async update(id: number, product: Product): Promise<void> {
        const db = await getDb();
        await db.run(
            'UPDATE Products SET name = ?, price = ?, description = ? WHERE id = ?',
            [product.name, product.price, product.description, id]
        );
    },

    async delete(id: number): Promise<void> {
        const db = await getDb();
        await db.run('DELETE FROM Products WHERE id = ?', [id]);
    }
};