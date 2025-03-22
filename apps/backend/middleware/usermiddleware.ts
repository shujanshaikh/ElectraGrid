import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
   try {
    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ error: "Unauthorized" });
        return
   }
    const token = authHeader?.split(" ")[1]
    if(!token){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string}
    if(!decoded){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }
    req.userId = decoded.userId
    next()
   } catch (error) {
    res.status(500).json({
        message : "Internal Server Error"
    })
   }
}