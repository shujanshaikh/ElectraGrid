import prisma from "@repo/db";
import { VehicleSchema } from "@repo/common";
import { Router } from "express";
import { userMiddleware } from "../../middleware/usermiddleware";

export const vehicleRouter = Router()


vehicleRouter.post("/vehicle", userMiddleware,   async (req, res) => {
    try {

        const parsedData = VehicleSchema.safeParse(req.body)
        console.log(parsedData)
        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid Data Zod"
            })
            return
        }
        const vehicle = await prisma.vehicle.create({
            data: {
                model: parsedData.data.model,
                year: parsedData.data.year,
                batteryCapacity: parsedData.data.batteryCapacity,
                userId: req.userId
            }
        })

        res.status(200).json({
            message: "Vehicle Created Successfully",
            vehicle
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

vehicleRouter.get("/vehicle" , userMiddleware , async (req , res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            where : {
                userId : req.userId,
            }
        })

        res.status(200).json({
            message : "Vehicles Fetched Successfully",
            vehicles
        })
        
        
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

vehicleRouter.delete("/vehicle/:id" , userMiddleware , async (req , res) => {
    try {
        const vehicle = await prisma.vehicle.delete({
            where : {
                id : req.params.id,
                userId : req.userId
            }
        })
        res.status(200).json({
            message : "Vehicle Deleted Successfully",
            vehicle
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})