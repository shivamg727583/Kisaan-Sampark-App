import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createProduct); // Only for farmers
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, updateProduct); // Only for farmers
router.delete('/:id', authMiddleware, deleteProduct); // Only for farmers

export default router;
