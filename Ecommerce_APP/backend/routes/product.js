const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', getProducts);
router.post('/', auth, role('admin'), addProduct);
router.put('/:id', auth, role('admin'), updateProduct);
router.delete('/:id', auth, role('admin'), deleteProduct);

module.exports = router; 