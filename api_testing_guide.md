# E-Commerce API - Postman Testing Guide

This document contains all the API endpoints and dummy data for testing your E-Commerce backend step-by-step. All examples assume your server is running on `http://localhost:3000`.

> [!NOTE]
> Make sure to set your Body to **raw -> JSON** in Postman for all `POST` and `PUT` requests.

---

## 1. Users API (`/api/users`)

### Create User
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/users`
- **Body:**
```json
{
  "name": "Alif Hossain",
  "email": "alif@example.com",
  "age": 25,
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh"
}
```

### Get All Users
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/users`

### Get User By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/users/1`

### Update User
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/users/1`
- **Body:**
```json
{
  "address": "Banani, Dhaka"
}
```

### Delete User
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/users/1`

---

## 2. Categories API (`/api/categories`)

### Create Category
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/categories`
- **Body:**
```json
{
  "name": "Electronics",
  "description": "Smartphones, laptops, and more"
}
```

### Get All Categories
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/categories`

### Get Category By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/categories/1`

### Update Category
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/categories/1`
- **Body:**
```json
{
  "name": "Electronics & Gadgets"
}
```

### Delete Category
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/categories/1`

---

## 3. Products API (`/api/products`)

> [!IMPORTANT]
> Make sure you have created at least one Category before creating a Product, as `category_id` is required.

### Create Product
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/products`
- **Body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest Apple smartphone",
  "price": 1200,
  "stock": 50,
  "category_id": 1
}
```

### Get All Products
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products`

### Get Product By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/1`

### Update Product
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`
- **Body:**
```json
{
  "stock": 45
}
```

### Delete Product
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/products/1`

---

## 4. Orders API (`/api/orders`)

> [!IMPORTANT]
> Make sure you have created a User before creating an Order, as `user_id` is required.

### Create Order
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Body:**
```json
{
  "user_id": 1,
  "total_amount": 1200,
  "status": "pending"
}
```

### Get All Orders
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/orders`

### Get Order By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/orders/1`

### Update Order
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/orders/1`
- **Body:**
```json
{
  "status": "shipped"
}
```

### Delete Order
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/orders/1`

---

## 5. Order Items API (`/api/order-items`)

> [!IMPORTANT]
> Make sure you have created an Order (`order_id`) and a Product (`product_id`) before creating an Order Item.

### Create Order Item
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/order-items`
- **Body:**
```json
{
  "order_id": 1,
  "product_id": 1,
  "quantity": 1,
  "price": 1200
}
```

### Get All Order Items
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/order-items`

### Get Order Item By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/order-items/1`

### Update Order Item
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/order-items/1`
- **Body:**
```json
{
  "quantity": 2
}
```

### Delete Order Item
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/order-items/1`
