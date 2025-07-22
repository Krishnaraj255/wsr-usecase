import express, { Router } from 'express'
import { projectdetail } from '../../controllers/project/projectController'
import { z } from 'zod'
import { schemaValidation } from '../../../data/schemaValidator/schemaValidator'

const projectRoute = Router()

const projectDetail = z.object({
    projectId: z.string().optional(),
    projectName: z.string(),
    resources: z.record(z.any()),
    sprint: z.array(z.any()).optional()
})

projectRoute.post('/projectdetail', schemaValidation(projectDetail), projectdetail.post)

projectRoute.get('/projectdetail', projectdetail.get)

projectRoute.get('/projectdetail/:projectId', projectdetail.getSingleData)


export default projectRoute 