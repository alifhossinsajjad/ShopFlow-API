# ShopFlow API - E-Commerce Backend 🛒

A robust, scalable, and fully-featured E-Commerce RESTful API built with **Node.js, Express, TypeScript, and PostgreSQL**. This backend handles user authentication, product management, category organization, and order processing with strict validation and role-based access control (RBAC).

---

## 🚀 Features

- **Authentication & Security:** 
  - JWT-based authentication (Login, Forget Password, Reset Password).
  - Password hashing using `bcrypt`.
  - Rate limiting to protect against brute-force attacks (`express-rate-limit`).
- **Role-Based Access Control (RBAC):** Admin and User roles with restricted endpoints.
- **Product & Category Management:** Full CRUD operations for products and categories.
- **Order Processing:** Create and manage orders and order items.
- **Data Validation:** Strict payload validation using `Zod`.
- **Database:** Raw SQL queries optimized with PostgreSQL connection pooling (`pg`).
- **Email Notifications:** Automated emails for password resets (`nodemailer`).

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Validation:** Zod
- **Authentication:** JSON Web Token (JWT)
- **Development Tool:** TSX (TypeScript Execution)

---

## 📂 Folder Structure

```text
src/
├── app/
│   ├── middlewares/      # Express middlewares (auth, validation, global error handler)
│   ├── modules/          # Domain-driven modules (auth, users, products, categories, orders)
│   │   ├── auth/         # Auth routes, controller, service, validation
│   │   ├── products/     # Product routes, controller, service, validation
│   │   └── ...           
│   └── routes/           # Centralized API routing
├── config/               # Database and environment configurations
└── server.ts             # Application entry point
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/)

---

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/alifhossinsajjad/ShopFlow-API.git
cd ShopFlow-API
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=3000
DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_db_name
JWT_SECRET=your_super_secret_key
RESET_PASS_UI_LINK=http://localhost:3000/reset-password
# Nodemailer SMTP config (if applicable)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

### 4. Run the Application

**Development Mode:**
Runs the app with auto-reload using `tsx`.
```bash
npm run dev
```

**Production Build:**
Compiles TypeScript to JavaScript and runs the compiled code.
```bash
npm run build
npm start
```

---

## 📖 API Testing & Documentation

For a comprehensive guide on testing all the available endpoints using **Postman**, including dummy JSON data and authorization setup, please refer to the **[API Testing Guide](./api_testing_guide.md)**.

---

## 🔐 Authorization

Most API routes are protected. You need to include a JWT Token in the headers of your HTTP requests:
```text
Authorization: Bearer <your_jwt_token>
```

Roles available:
- `admin`: Has full access to modify products, categories, orders, and manage users.
- `user`: Can view products/categories, create orders, and manage their own profile.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/alifhossinsajjad/ShopFlow-API/issues).

## 📝 License

This project is licensed under the ISC License.