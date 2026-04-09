import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();

// Produtos
router.get('/products', ProductController.index);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.destroy);

export default router;