import prisma from "@repo/db";
import { MessageSchema } from "@repo/common";
import { Router } from "express";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../../prompts/systemPrompts";

export const chatRouter = Router()


chatRouter.post("/chat",  async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    try {
        const {message} = req.body

        await prisma.message.create({
            data: {
                content: message,
                role: "USER",
                userId: req.userId
            }
        })

        const previousMessage = await prisma.message.findMany({
            where: {
                userId: req.userId
            }, orderBy: {
                createdAt: "asc"
            }
        })

        const allmessages: ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...previousMessage.map((p : any) => ({
                role: p.role.toLowerCase() as "user" | "assistant" | "system",
                content: p.content || ""
            }), {
                role: "user", content:message
            })
        ]

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: allmessages
        });

        const reply = response.choices[0]?.message.content;

        await prisma.message.create({
            data: {
                role: "ASSISTANT",
                content: reply || ""
            }
        })
        console.log(reply)  
        res.json({
            reply
        })
        return
    } catch (error) {
        res.status(500).json({
            message: "Unauthorized Error"
        })
    }
})