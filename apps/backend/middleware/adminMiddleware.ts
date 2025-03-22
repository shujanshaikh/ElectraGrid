import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("control reached here admin middleware")
    console.log("Received Headers:", req.headers);
    console.log("Received Body:", req.body);
    try {
        const jwtHeaders = req.headers["authorization"]
        if (!jwtHeaders || !jwtHeaders.startsWith("Bearer")) {
             res.status(401).json({ error: "Unauthorized" });
             return
        }
        const token = jwtHeaders?.split(" ")[1]

        if (!token) {
            res.status(400).json({
                message: "Invalid token"
            })
            return
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, role: string }
        if (decoded.role !== "ADMIN") {
            res.status(400).json({
                message: "Not decoded"
            })
            return
        }
        console.log(decoded)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}