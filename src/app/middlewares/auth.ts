import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET || "fallback_secret_key";

      const decoded = jwt.verify(token, secret) as any;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // Add user to request object
      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized!",
      });
    }
  };
};
