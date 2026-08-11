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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM products');
    return result.rows;
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
});
exports.getProductById = getProductById;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, category_id } = productData;
    const result = yield db_1.default.query('INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, price, stock, category_id]);
    return result.rows[0];
});
exports.createProduct = createProduct;
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, category_id } = productData;
    const result = yield db_1.default.query(`UPDATE products 
         SET name = COALESCE($1, name), 
             description = COALESCE($2, description),
             price = COALESCE($3, price),
             stock = COALESCE($4, stock),
             category_id = COALESCE($5, category_id)
         WHERE id = $6 RETURNING *`, [name, description, price, stock, category_id, id]);
    return result.rows[0];
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
});
exports.deleteProduct = deleteProduct;
