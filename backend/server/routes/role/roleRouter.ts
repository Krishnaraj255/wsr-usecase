import express, { Router } from "express"
import { role } from "../../controllers/role/roleController"
import { z } from 'zod'
import { schemaValidation } from "../../../data/schemaValidator/schemaValidator"

const roleRoute = Router()

const roleSchema = z.object({
    roleName: z.array(z.string())
}).strict()


roleRoute.post('/role', schemaValidation(roleSchema), role.post)

roleRoute.get('/role', role.get)


export default roleRoute

 