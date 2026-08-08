import pool from "../../config/db";

export const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

export const getProductById = async (id: number) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

export const createProduct = async (productData: any) => {
    const { name, description, price, stock, category_id } = productData;
    const result = await pool.query(
        'INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, price, stock, category_id]
    );
    return result.rows[0];
};

export const updateProduct = async (id: number, productData: any) => {
    const { name, description, price, stock, category_id } = productData;
    const result = await pool.query(
        `UPDATE products 
         SET name = COALESCE($1, name), 
             description = COALESCE($2, description),
             price = COALESCE($3, price),
             stock = COALESCE($4, stock),
             category_id = COALESCE($5, category_id)
         WHERE id = $6 RETURNING *`,
        [name, description, price, stock, category_id, id]
    );
    return result.rows[0];
};

export const deleteProduct = async (id: number) => {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
};
