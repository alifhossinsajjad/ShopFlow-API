import eventEmitter from "../../utils/eventEmitter";

export const ORDER_EVENTS = {
    ORDER_CREATED: 'ORDER_CREATED',
};

const setupOrderListeners = () => {
    eventEmitter.on(ORDER_EVENTS.ORDER_CREATED, (orderData) => {
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

export default setupOrderListeners;
