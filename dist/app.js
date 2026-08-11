"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const user_route_1 = __importDefault(require("./app/modules/users/user.route"));
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const category_route_1 = __importDefault(require("./app/modules/categories/category.route"));
const product_route_1 = __importDefault(require("./app/modules/products/product.route"));
const order_route_1 = __importDefault(require("./app/modules/orders/order.route"));
const order_item_route_1 = __importDefault(require("./app/modules/order_items/order_item.route"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Apply global rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use(limiter);
// Routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/order-items", order_item_route_1.default);
// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the E-Commerce API!");
});
// Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
exports.default = app;
