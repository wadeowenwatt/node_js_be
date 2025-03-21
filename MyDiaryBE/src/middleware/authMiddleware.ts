import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({
      message: "No token provided!"
    });
    return;
  }

  jwt.verify(
    token!,
    process.env.JWT_SECRET!,
    (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid token"
        });
        return;
      }

      req.userId = decoded.id;

    }
  );
}

export default authMiddleware;