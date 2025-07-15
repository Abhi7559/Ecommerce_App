# Simple E-commerce API

## Features
- Product Listings (with pagination & search)
- Cart Management (add, update, remove items)
- Order Creation
- User Authentication (JWT) with Roles (customer, admin)
- Admin can manage products
- Basic HTML frontend for testing

## Setup

### 1. Backend
- Go to `backend/`
- Install dependencies:
  ```
  npm install
  ```
- Create a `.env` file in `backend/` with:
  ```
  MONGO_URI=mongodb://localhost:27017/ecommerce
  JWT_SECRET=supersecretkey
  PORT=5000
  ```
- Start MongoDB locally (or use MongoDB Atlas)
- Start the server:
  ```
  npm run dev
  ```

### 2. Frontend
- Open `frontend/index.html` in your browser

## API Endpoints
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/products` — List products (search/pagination)
- `POST /api/products` — Add product (admin)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)
- `GET /api/cart` — Get cart (customer)
- `POST /api/cart/add` — Add to cart (customer)
- `PUT /api/cart/update` — Update cart item (customer)
- `DELETE /api/cart/remove` — Remove from cart (customer)
- `POST /api/orders` — Place order (customer)
- `GET /api/orders` — List orders (customer)

## Notes
- Use the frontend for easy testing.
- Default port: 5000
- You can register as admin or customer. 