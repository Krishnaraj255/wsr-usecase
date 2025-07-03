import express, { Router } from 'express'
import { projectdetail } from '../../controllers/project/projectController'
import { z } from 'zod'
import { schemaValidation } from '../../../data/schemaValidator/schemaValidator'

const projectRoute = Router()

const projectDetail = z.object({
    projectName: z.string(),
    resources: z.record(z.any()),
    sprint: z.record(z.any())
}).strict()

projectRoute.post('/projectdetail', schemaValidation(projectDetail), projectdetail.post)

projectRoute.get('/projectdetail', projectdetail.get)



export default projectRoute 