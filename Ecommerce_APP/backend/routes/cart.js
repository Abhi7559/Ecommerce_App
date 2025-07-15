const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', auth, role('customer'), getCart);
router.post('/add', auth, role('customer'), addToCart);
router.put('/update', auth, role('customer'), updateCartItem);
router.delete('/remove', auth, role('customer'), removeFromCart);

module.exports = router; 