import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const secretKey = process.env.SECRET_KEY;

      if (!secretKey) {
        return res.status(500).json({
          message: "Secret key is not defined in environment variables",
        });
      }

      try {
        const decodeToken = jwt.verify(token.split(" ")[1], secretKey);
        if (decodeToken) {
          return next();
        }
      } catch (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
    } else {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export default auth;
