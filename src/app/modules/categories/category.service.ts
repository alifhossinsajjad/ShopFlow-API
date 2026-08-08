import pool from "../../config/db";

export const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
};

export const getCategoryById = async (id: number) => {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
};

export const createCategory = async (categoryData: any) => {
    const { name, description } = categoryData;
    const result = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
    );
    return result.rows[0];
};

export const updateCategory = async (id: number, categoryData: any) => {
    const { name, description } = categoryData;
    const result = await pool.query(
        `UPDATE categories 
         SET name = COALESCE($1, name), 
             description = COALESCE($2, description) 
         WHERE id = $3 RETURNING *`,
        [name, description, id]
    );
    return result.rows[0];
};

export const deleteCategory = async (id: number) => {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
};
