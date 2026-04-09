import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { OrderController } from '../controllers/OrderController';

const router = Router();

// Produtos
router.get('/products', ProductController.index);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.destroy);

// Pedidos
router.get('/orders', OrderController.index);
router.post('/orders', OrderController.store);
router.patch('/orders/:id/confirm', OrderController.confirm);

export default router;