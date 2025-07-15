const User = require('../models/user');
const Product = require('../models/product');

// Get current user's cart
exports.getCart = async (req, res) => {
  await req.user.populate('cart.product');
  res.json(req.user.cart);
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const cartItem = req.user.cart.find(item => item.product.equals(productId));
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    req.user.cart.push({ product: productId, quantity });
  }
  await req.user.save();
  res.json(req.user.cart);
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cartItem = req.user.cart.find(item => item.product.equals(productId));
  if (!cartItem) return res.status(404).json({ message: 'Item not in cart' });
  cartItem.quantity = quantity;
  await req.user.save();
  res.json(req.user.cart);
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  req.user.cart = req.user.cart.filter(item => !item.product.equals(productId));
  await req.user.save();
  res.json(req.user.cart);
}; 