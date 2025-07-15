const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI, port } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));

// Root endpoint
app.get('/', (req, res) => res.send('E-commerce API running'));

// Connect to MongoDB and start server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 