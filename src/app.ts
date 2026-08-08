import express, { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import userRoutes from "./app/modules/users/user.route";
import categoryRoutes from "./app/modules/categories/category.route";
import productRoutes from "./app/modules/products/product.route";
import orderRoutes from "./app/modules/orders/order.route";
import orderItemRoutes from "./app/modules/order_items/order_item.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

// Middlewares
app.use(express.json());

// Apply global rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use(limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the E-Commerce API!");
});

// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;