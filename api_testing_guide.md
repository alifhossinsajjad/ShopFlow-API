# E-Commerce API - Postman Testing Guide

This document contains all the API endpoints and dummy data for testing your E-Commerce backend step-by-step. All examples assume your server is running on `http://localhost:3000`.

> [!NOTE]
> **Postman Setup Tips:**
> 1. **Body format:** Make sure to set your Body to **raw -> JSON** in Postman for all `POST` and `PUT` requests.
> 2. **Authentication:** Many routes require authentication. First, login via the Auth API to get a token, then for protected routes, go to the **Authorization** tab in Postman, select **Bearer Token**, and paste your token.

---

## 1. Auth API (`/api/auth`)

### Login
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/login`
- **Authorization:** None
- **Body:**
```json
{
  "email": "alif@example.com",
  "password": "password123"
}
```
*(Save the token from the response to use in other requests)*

### Forget Password
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/forget-password`
- **Authorization:** None
- **Body:**
```json
{
  "email": "alif@example.com"
}
```

### Reset Password
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/reset-password`
- **Authorization:** None
- **Body:**
```json
{
  "token": "your_reset_token_here",
  "newPassword": "newpassword123"
}
```

---

## 2. Users API (`/api/users`)

### Create User (Register)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/users`
- **Authorization:** None
- **Body:**
```json
{
  "name": "Alif Hossain",
  "email": "alif@example.com",
  "password": "password123",
  "role": "user",
  "age": 25,
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh"
}
```

### Get All Users
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/users`
- **Authorization:** Bearer Token (Admin)

### Get User By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/users/1`
- **Authorization:** Bearer Token (Admin, User)

### Update User
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/users/1`
- **Authorization:** Bearer Token (Admin, User)
- **Body:**
```json
{
  "address": "Banani, Dhaka",
  "phone": "01800000000"
}
```

### Delete User
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/users/1`
- **Authorization:** Bearer Token (Admin)

---

## 3. Categories API (`/api/categories`)

### Create Category
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/categories`
- **Authorization:** Bearer Token (Admin)
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
- **Authorization:** None

### Get Category By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/categories/1`
- **Authorization:** None

### Update Category
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/categories/1`
- **Authorization:** Bearer Token (Admin)
- **Body:**
```json
{
  "name": "Electronics & Gadgets"
}
```

### Delete Category
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/categories/1`
- **Authorization:** Bearer Token (Admin)

---

## 4. Products API (`/api/products`)

> [!IMPORTANT]
> Make sure you have created at least one Category before creating a Product, as `category_id` is required.

### Create Product
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/products`
- **Authorization:** Bearer Token (Admin)
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
- **Authorization:** None

### Get Product By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/1`
- **Authorization:** None

### Update Product
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`
- **Authorization:** Bearer Token (Admin)
- **Body:**
```json
{
  "stock": 45,
  "price": 1150
}
```

### Delete Product
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/products/1`
- **Authorization:** Bearer Token (Admin)

---

## 5. Orders API (`/api/orders`)

> [!IMPORTANT]
> Make sure you have created a User before creating an Order, as `user_id` is required.

### Create Order
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Authorization:** Bearer Token (Admin, User)
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
- **Authorization:** Bearer Token (Admin)

### Get Order By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/orders/1`
- **Authorization:** Bearer Token (Admin, User)

### Update Order
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/orders/1`
- **Authorization:** Bearer Token (Admin)
- **Body:**
```json
{
  "status": "shipped"
}
```

### Delete Order
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/orders/1`
- **Authorization:** Bearer Token (Admin)

---

## 6. Order Items API (`/api/order-items`)

> [!IMPORTANT]
> Make sure you have created an Order (`order_id`) and a Product (`product_id`) before creating an Order Item.

### Create Order Item
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/order-items`
- **Authorization:** Bearer Token (Admin)
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
- **Authorization:** Bearer Token (Admin)

### Get Order Item By ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/order-items/1`
- **Authorization:** Bearer Token (Admin)

### Update Order Item
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/order-items/1`
- **Authorization:** Bearer Token (Admin)
- **Body:**
```json
{
  "quantity": 2,
  "price": 2400
}
```

### Delete Order Item
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/order-items/1`
- **Authorization:** Bearer Token (Admin)
