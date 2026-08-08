import pool from "../../config/db";

export const getAllOrderItems = async () => {
    const result = await pool.query('SELECT * FROM order_items');
    return result.rows;
};

export const getOrderItemById = async (id: number) => {
    const result = await pool.query('SELECT * FROM order_items WHERE id = $1', [id]);
    return result.rows[0];
};

export const createOrderItem = async (orderItemData: any) => {
    const { order_id, product_id, quantity, price } = orderItemData;
    const result = await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [order_id, product_id, quantity, price]
    );
    return result.rows[0];
};

export const updateOrderItem = async (id: number, orderItemData: any) => {
    const { quantity, price } = orderItemData;
    const result = await pool.query(
        `UPDATE order_items 
         SET quantity = COALESCE($1, quantity), 
             price = COALESCE($2, price) 
         WHERE id = $3 RETURNING *`,
        [quantity, price, id]
    );
    return result.rows[0];
};

export const deleteOrderItem = async (id: number) => {
    const result = await pool.query('DELETE FROM order_items WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
};
