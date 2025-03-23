import prisma from "@repo/db";
import { ChargingStationSchema, EnergyUsageSchema } from "@repo/common";
import {  Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware";


export const adminRouter = Router()

adminRouter.post("/stations" , adminMiddleware , async (req , res) => {
    console.log("control reached here stations")   
    try {
        const parsedData = ChargingStationSchema.safeParse(req.body)
        console.log(parsedData)
    if(!parsedData.success){
        res.status(400).json({
            message : "Invalid Stations parsed data"
        })
        return
    }
   
    const station = await prisma.chargingStation.create({
        data : {
            name : parsedData.data.name,
            address : parsedData.data.address,
            city : parsedData.data.city,
            state : parsedData.data.state,
            zipCode : parsedData.data.zipCode,
            price : parsedData.data.price,
            powerOutput : parsedData.data.powerOutput,
            latitude : parsedData.data.latitude,
            longitude : parsedData.data.longitude,
            status : parsedData.data.status,
        }
    })
    console.log(station)
        res.status(200).json({
            message : "Station Created Successfully",
            station
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error",
            error
        })
    }
})

adminRouter.delete("/stations/:id" , adminMiddleware , async (req , res) => {
    try {
        const station = await prisma.chargingStation.delete({
            where : {
                id : req.params.id
            }
        })
        res.status(200).json({
                message : "Station Deleted Successfully",
                station
        })
    } catch (error) {
            res.status(500).json({
                message : "Internal Server Error"
        })        
    }
})

adminRouter.post("/energy-usage" , adminMiddleware , async (req , res) => {
    try {
        const parsedData = EnergyUsageSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(400).json({
                message : "Invalid Data"
            })
            return
        }
        const energyUsage = await prisma.energyUsage.create({
            data : {
                userId : req.userId,
                stationId : parsedData.data.stationId,
                kWhUsed : parsedData.data.kWhUsed,
                cost : parsedData.data.cost,
            }
        })
        res.status(200).json({
            message : "Energy Usage Created Successfully",
            energyUsage
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

adminRouter.get("/energy-usage/:id" , adminMiddleware , async (req , res) => {
    try {
        const energyUsage = await prisma.energyUsage.findUnique({
            where : {
                id : req.params.id
            }
        })
        res.status(200).json({
            message : "Energy Usage Fetched Successfully",
            energyUsage
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }   
})

adminRouter.delete("/energy-usage/:id" , adminMiddleware , async (req , res) => {
    try {
        const energyUsage = await prisma.energyUsage.delete({
            where : {
                id : req.params.id
            }
        })
        res.status(200).json({
            message : "Energy Usage Deleted Successfully",
            energyUsage
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})