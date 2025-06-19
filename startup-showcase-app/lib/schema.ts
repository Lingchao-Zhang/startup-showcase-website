"use client"
 
import { z } from "zod"

const startupFormSchema = z.object({
    title: z.string().min(3, {message: "title must have at least 3 characters"}).max(20, {message: "title can't exceed to 20 characters"}),
    description: z.string().min(10, {message: "description must have at least 10 characters"}).max(500, {message: "title can't exceed to 500 characters"}),
    category: z.string().min(3, {message: "category must have at least 3 characters"}).max(20, {message: "title can't exceed to 20 characters"}),
    image: z.string().url().refine(async (url) => {
        const res = await fetch(url, {method: "HEAD"})
        const contentType = res.headers.get("content-type")
        return contentType?.startsWith("image/")
    }, {message: "Invalid Image url"}),
    pitch: z.string().min(30, {message: "pitch must have at least 30 characters"})
})

export default startupFormSchema