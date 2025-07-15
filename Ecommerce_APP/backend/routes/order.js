const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role('customer'), createOrder);
router.get('/', auth, role('customer'), getOrders);

module.exports = router; 