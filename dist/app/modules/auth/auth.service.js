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
exports.resetPassword = exports.forgetPassword = exports.loginUser = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // 1. Check if user exists
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    // 2. Check if password matches
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Incorrect password");
    }
    // 3. Generate JWT Token
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const token = jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn: expiresIn,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
});
exports.loginUser = loginUser;
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check if user exists
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    // 2. Generate a reset token using user's current password as part of the secret
    // This makes the token invalid once the password is changed
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "15m" });
    // 3. Construct reset link
    const uiLink = process.env.RESET_PASS_UI_LINK || "http://localhost:3000/reset-password";
    const resetLink = `${uiLink}?token=${token}`;
    // 4. Send email
    yield (0, sendEmail_1.sendEmail)(user.email, resetLink);
    return { message: "Password reset link sent to email" };
});
exports.forgetPassword = forgetPassword;
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = payload;
    // 1. Decode token to get user id/email without verification first
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded || !decoded.email) {
        throw new Error("Invalid token");
    }
    // 2. Check if user exists
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [
        decoded.email,
    ]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    // 3. Verify token with the user's current password hash
    const secret = process.env.JWT_SECRET + user.password;
    try {
        jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
    // 4. Hash new password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    // 5. Update user password in the database
    yield db_1.default.query("UPDATE users SET password = $1 WHERE email = $2", [
        hashedPassword,
        user.email,
    ]);
    return { message: "Password has been reset successfully" };
});
exports.resetPassword = resetPassword;
