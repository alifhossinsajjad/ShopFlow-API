import pool from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";
export const loginUser = async (payload: any) => {
  const { email, password } = payload;

  // 1. Check if user exists
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Check if password matches
  const isPasswordMatched = await bcrypt.compare(password, user.password);

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

  const token = jwt.sign(jwtPayload, secret!, {
    expiresIn: expiresIn as any,
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
};

export const forgetPassword = async (email: string) => {
  // 1. Check if user exists
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
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

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  // 3. Construct reset link
  const uiLink = process.env.RESET_PASS_UI_LINK || "http://localhost:3000/reset-password";
  const resetLink = `${uiLink}?token=${token}`;

  // 4. Send email
  await sendEmail(user.email, resetLink);

  return { message: "Password reset link sent to email" };
};

export const resetPassword = async (payload: any) => {
  const { token, newPassword } = payload;

  // 1. Decode token to get user id/email without verification first
  const decoded = jwt.decode(token) as any;
  if (!decoded || !decoded.email) {
    throw new Error("Invalid token");
  }

  // 2. Check if user exists
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [decoded.email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  // 3. Verify token with the user's current password hash
  const secret = process.env.JWT_SECRET + user.password;
  try {
    jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  // 4. Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 5. Update user password in the database
  await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, user.email]);

  return { message: "Password has been reset successfully" };
};
