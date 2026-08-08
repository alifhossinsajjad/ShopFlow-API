import pool from "../../config/db";
import eventEmitter from "../../utils/eventEmitter";
import { ORDER_EVENTS } from "./order.listener";

export const getAllOrders = async () => {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
};

export const getOrderById = async (id: number) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
};

export const createOrder = async (orderData: any) => {
    const { user_id, total_amount, status } = orderData;
    const result = await pool.query(
        'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
        [user_id, total_amount, status || 'pending']
    );
    const newOrder = result.rows[0];
    
    // Emit event asynchronously
    eventEmitter.emit(ORDER_EVENTS.ORDER_CREATED, newOrder);
    
    return newOrder;
};

export const updateOrder = async (id: number, orderData: any) => {
    const { total_amount, status } = orderData;
    const result = await pool.query(
        `UPDATE orders 
         SET total_amount = COALESCE($1, total_amount), 
             status = COALESCE($2, status) 
         WHERE id = $3 RETURNING *`,
        [total_amount, status, id]
    );
    return result.rows[0];
};

export const deleteOrder = async (id: number) => {
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
};
