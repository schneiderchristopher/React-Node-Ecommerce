import { Request, Response } from 'express';
import { OrderModel } from '../models/OrderModel';

export const OrderController = {
    async index(_req: Request, res: Response) {
        try {
            const orders = await OrderModel.getAll();
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar pedidos' });
        }
    },

    async store(req: Request, res: Response) {
        try {
            const { client_id, items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ error: 'O pedido precisa ter pelo menos um item.' });
            }

            // Adicionei uma lógica por padrão que define a data de entrega de pedido para 7 dias após a data atual.
            const dataAtual = new Date();
            dataAtual.setDate(dataAtual.getDate() + 7);

            const dataEntregaFormatada = dataAtual.toISOString().split('T')[0];

            const orderId = await OrderModel.create(
                {
                    client_id,
                    delivery_date: dataEntregaFormatada,
                    status: 'pending'
                },
                items
            );

            res.status(201).json({
                id: orderId,
                delivery_date: dataEntregaFormatada,
                message: 'Pedido registrado com sucesso'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao registrar pedido' });
        }
    },


    async confirm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await OrderModel.confirmOrder(Number(id));

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao confirmar pedido' });
        }
    }
};