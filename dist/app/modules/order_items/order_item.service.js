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
exports.deleteOrderItem = exports.updateOrderItem = exports.createOrderItem = exports.getOrderItemById = exports.getAllOrderItems = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllOrderItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM order_items');
    return result.rows;
});
exports.getAllOrderItems = getAllOrderItems;
const getOrderItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM order_items WHERE id = $1', [id]);
    return result.rows[0];
});
exports.getOrderItemById = getOrderItemById;
const createOrderItem = (orderItemData) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, product_id, quantity, price } = orderItemData;
    const result = yield db_1.default.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_id, quantity, price]);
    return result.rows[0];
});
exports.createOrderItem = createOrderItem;
const updateOrderItem = (id, orderItemData) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, price } = orderItemData;
    const result = yield db_1.default.query(`UPDATE order_items 
         SET quantity = COALESCE($1, quantity), 
             price = COALESCE($2, price) 
         WHERE id = $3 RETURNING *`, [quantity, price, id]);
    return result.rows[0];
});
exports.updateOrderItem = updateOrderItem;
const deleteOrderItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('DELETE FROM order_items WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
});
exports.deleteOrderItem = deleteOrderItem;
