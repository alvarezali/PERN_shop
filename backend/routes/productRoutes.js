import express from 'express';
import { getAllProducts, createProduct, modifyProduct, deleteProduct } from '../controllers/productController.js';

const router = new express.Router();

router.get('/', getAllProducts);

router.post('/', createProduct);

router.put('/', modifyProduct);

router.delete('/', deleteProduct);


export default router;