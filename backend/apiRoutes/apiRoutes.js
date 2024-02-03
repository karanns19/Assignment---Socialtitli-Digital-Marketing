import express from 'express';
import { userLogin } from '../controller/login.js';
import { createUser, getUsers, updateUsers, deleteUser } from '../controller/newUsers.js';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controller/product.js';
import { createRole, getRoles, updateRole, deleteRole } from '../controller/roles.js';

const router = express.Router();

// Admin Login API Route
router.post('/login', userLogin);

// User Handling API Route
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUser);

// Product Category API Route
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Role Category API Route
router.get('/roles', getRoles);
router.post('/roles', createRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

export default router;