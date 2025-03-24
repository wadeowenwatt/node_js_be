import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userId?: number;
}

interface AuthPayload extends JwtPayload {
  id: number;
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({
      message: "No token provided!",
    });
    return;
  }

  jwt.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }
    req.userId = (decoded as AuthPayload).id;
    next();
  });
}

export default authMiddleware;
