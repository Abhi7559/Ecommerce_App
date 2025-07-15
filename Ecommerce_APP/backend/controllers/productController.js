const Product = require('../models/product');

// Public: Get products with pagination and search
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, search = '', category = '' } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const count = await Product.countDocuments(query);
    res.json({ products, total: count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Add product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Admin: Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Admin: Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
}; 