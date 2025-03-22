import { z } from "zod"

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["USER", "ADMIN"]),
})

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const VehicleSchema = z.object({
    model: z.string(),
    year: z.preprocess((val) => Number(val), z.number()),
    batteryCapacity:  z.preprocess((val) => Number(val), z.number())
})

export const PaymentSchema = z.object({
    amount: z.number(),
    duration: z.enum(["MONTHLY", "YEARLY"]),
})

export const MessageSchema = z.object({
    message: z.string(),
})

export const EnergyUsageSchema = z.object({
    stationId: z.string(),
    kWhUsed: z.number(),
    cost: z.number(),
})

export const ChargingStationSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    price: z.preprocess((val) => Number(val), z.number()),
    powerOutput: z.preprocess((val) => Number(val), z.number()),
    status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
})



export const SubscriptionSchema = z.object({
    subscription: z.enum(["FREE", "PRO", "PREMIUM"]),
})

