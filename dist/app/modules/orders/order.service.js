"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const db_1 = __importDefault(require("../../config/db"));
const eventEmitter_1 = __importDefault(require("../../utils/eventEmitter"));
const order_listener_1 = require("./order.listener");
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM orders');
    return result.rows;
});
exports.getAllOrders = getAllOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
});
exports.getOrderById = getOrderById;
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, total_amount, status } = orderData;
    const result = yield db_1.default.query('INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *', [user_id, total_amount, status || 'pending']);
    const newOrder = result.rows[0];
    // Emit event asynchronously
    eventEmitter_1.default.emit(order_listener_1.ORDER_EVENTS.ORDER_CREATED, newOrder);
    return newOrder;
});
exports.createOrder = createOrder;
const updateOrder = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { total_amount, status } = orderData;
    const result = yield db_1.default.query(`UPDATE orders 
         SET total_amount = COALESCE($1, total_amount), 
             status = COALESCE($2, status) 
         WHERE id = $3 RETURNING *`, [total_amount, status, id]);
    return result.rows[0];
});
exports.updateOrder = updateOrder;
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
});
exports.deleteOrder = deleteOrder;
