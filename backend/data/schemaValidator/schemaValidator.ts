import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const schemaValidation = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            res.status(400).json({ error: result.error.format() })
            return
        }
        req.body = result.data
        next()
    }
}