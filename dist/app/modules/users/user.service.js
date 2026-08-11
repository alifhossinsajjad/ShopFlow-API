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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Example service: Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT id, name, email, role, age, phone, address, created_at FROM users");
    return result.rows;
});
exports.getAllUsers = getAllUsers;
// Example service: Get single user
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT id, name, email, role, age, phone, address, created_at FROM users WHERE id = $1", [id]);
    return result.rows[0];
});
exports.getUserById = getUserById;
// Example service: Create a user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role = "user", age, phone, address } = userData;
    if (!password) {
        throw new Error("Password is required");
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield db_1.default.query("INSERT INTO users (name, email, password, role, age, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, role", [name, email, hashedPassword, role, age, phone, address]);
    return result.rows[0];
});
exports.createUser = createUser;
// Example service: Update a user
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role, age, phone, address } = userData;
    const result = yield db_1.default.query(`UPDATE users 
     SET name = COALESCE($1, name), 
         email = COALESCE($2, email), 
         role = COALESCE($3, role),
         age = COALESCE($4, age), 
         phone = COALESCE($5, phone), 
         address = COALESCE($6, address),
         updated_at = NOW() 
     WHERE id = $7 RETURNING id, name, email, role`, [name, email, role, age, phone, address, id]);
    return result.rows[0];
});
exports.updateUser = updateUser;
// Example service: Delete a user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
});
exports.deleteUser = deleteUser;
