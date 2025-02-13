import jwt from 'jsonwebtoken'
import  { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv'
import { checkAdmin } from './utilities';

dotenv.config()


interface AuthRequest extends Request {
    userId?: number; 
    // partnerId?: number;
}

export const auth:RequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.Ecomm_token;
        if (!token) {
            res.status(401).json({ message: "Token not found" });
            return
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not defined in environment variables.");
            res.status(500).json({ message: "Internal server error" });
            return 
        }

        const decoded = jwt.verify(token, secret) as { userId: number; email: string };
        req.userId = decoded.userId; 

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).json({ message: 'Unauthorized' });
        return
    }
};

export const authadmin:RequestHandler = async(req:Request, res:Response,next:NextFunction) => {

    const userId = (req as any).userId;
    try {
        const admin = await checkAdmin(userId)
        if(!admin){
            res.json({ message: 'only admin are allow', success:false});
            return;
        }
        next();
    } catch (error) {
        console.error("admin verification failed:", error);
        res.status(401).json({ message: 'Unauthorized' });
        return
    }
}