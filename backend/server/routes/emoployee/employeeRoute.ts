import express, { Router } from 'express'
import { employee } from '../../controllers/employeeController'
import { z } from 'zod'
import { schemaValidation } from '../../../data/schemaValidator/schemaValidator'
const employeeRoute = Router()

const employeeSchema = z.object({
    employeeNames: z.array(z.string())
}).strict()

employeeRoute.post('/employee', schemaValidation(employeeSchema), employee.post)

employeeRoute.get('/employee', employee.get)


export default employeeRoute  