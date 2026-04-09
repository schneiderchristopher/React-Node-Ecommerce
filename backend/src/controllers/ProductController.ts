import type { Request, Response } from 'express';
import { ProductModel } from '../models/ProductModel';

export const ProductController = {
    async index(_req: Request, res: Response) {
        try {
            const products = await ProductModel.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    async store(req: Request, res: Response) {
        try {
            const { name, price, description, imageUrl } = req.body;
            const id = await ProductModel.create({ name, price, description, imageUrl });
            res.status(201).json({ id, message: 'Produto criado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    },

    async update(req: Request, res: Response) {
        await ProductModel.update(Number(req.params.id), req.body);
        res.status(204).send();
    },

    async destroy(req: Request, res: Response) {
        await ProductModel.delete(Number(req.params.id));
        res.json({ message: 'Produto deletado' });
    }
};