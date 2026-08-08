import pool from "../../config/db";

// Example service: Get all users
export const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, name, email, age, phone, address, created_at FROM users",
  );
  return result.rows;
};

// Example service: Get single user
export const getUserById = async (id: number) => {
  const result = await pool.query(
    "SELECT id, name, email, age, phone, address, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export interface IUser {
  name: string;
  email: string;
  age?: number;
  phone?: string;
  address?: string;
}

// Example service: Create a user
export const createUser = async (userData: IUser) => {
  const { name, email, age, phone, address } = userData;
  const result = await pool.query(
    "INSERT INTO users (name, email, age, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email",
    [name, email, age, phone, address],
  );
  return result.rows[0];
};

// Example service: Update a user
export const updateUser = async (id: number, userData: Partial<IUser>) => {
  const { name, email, age, phone, address } = userData;
  const result = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name), 
         email = COALESCE($2, email), 
         age = COALESCE($3, age), 
         phone = COALESCE($4, phone), 
         address = COALESCE($5, address),
         updated_at = NOW() 
     WHERE id = $6 RETURNING id, name, email`,
    [name, email, age, phone, address, id]
  );
  return result.rows[0];
};

// Example service: Delete a user
export const deleteUser = async (id: number) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
};
