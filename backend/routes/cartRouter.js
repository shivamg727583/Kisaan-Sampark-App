import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, removeFromCart);

export default router;
