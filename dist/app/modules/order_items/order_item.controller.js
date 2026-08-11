"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.updateOrderItem = exports.createOrderItem = exports.getOrderItemById = exports.getAllOrderItems = void 0;
const OrderItemService = __importStar(require("./order_item.service"));
const getAllOrderItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItems = yield OrderItemService.getAllOrderItems();
        res.status(200).json({ success: true, data: orderItems });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrderItems = getAllOrderItems;
const getOrderItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItem = yield OrderItemService.getOrderItemById(Number(req.params.id));
        if (!orderItem)
            return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, data: orderItem });
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderItemById = getOrderItemById;
const createOrderItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = yield OrderItemService.createOrderItem(req.body);
        res.status(201).json({ success: true, data: newOrderItem, message: "Order item created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderItem = createOrderItem;
const updateOrderItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrderItem = yield OrderItemService.updateOrderItem(Number(req.params.id), req.body);
        if (!updatedOrderItem)
            return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, data: updatedOrderItem, message: "Order item updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderItem = updateOrderItem;
const deleteOrderItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield OrderItemService.deleteOrderItem(Number(req.params.id));
        if (!isDeleted)
            return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, message: "Order item deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrderItem = deleteOrderItem;
