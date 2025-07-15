const Order = require('../models/order');
const Product = require('../models/product');

// Create order from cart
exports.createOrder = async (req, res) => {
  if (!req.user.cart.length) return res.status(400).json({ message: 'Cart is empty' });
  let total = 0;
  for (const item of req.user.cart) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product ? product.name : 'item'}` });
    }
    total += product.price * item.quantity;
    product.stock -= item.quantity;
    await product.save();
  }
  const order = new Order({
    user: req.user._id,
    items: req.user.cart.map(item => ({ product: item.product, quantity: item.quantity })),
    total,
  });
  await order.save();
  req.user.cart = [];
  await req.user.save();
  res.status(201).json(order);
};

// Get current user's orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
}; 