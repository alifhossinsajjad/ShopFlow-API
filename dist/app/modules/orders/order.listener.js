"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_EVENTS = void 0;
const eventEmitter_1 = __importDefault(require("../../utils/eventEmitter"));
exports.ORDER_EVENTS = {
    ORDER_CREATED: 'ORDER_CREATED',
};
const setupOrderListeners = () => {
    eventEmitter_1.default.on(exports.ORDER_EVENTS.ORDER_CREATED, (orderData) => {
        // Here we simulate a background task like sending an email or updating a third-party service
        console.log(`\n[EVENT EMITTED] Background Task Started...`);
        console.log(`[x] Processing Order ID: ${orderData.id}`);
        console.log(`[x] Total Amount: $${orderData.total_amount}`);
        console.log(`[x] Sending confirmation email to User ID: ${orderData.user_id}`);
        setTimeout(() => {
            console.log(`[EVENT COMPLETED] Email sent successfully for Order ID: ${orderData.id}\n`);
        }, 2000); // Simulate a 2 second delay for email sending
    });
};
exports.default = setupOrderListeners;
