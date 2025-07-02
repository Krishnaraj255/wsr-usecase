import express, { Router } from 'express'
import { projectdetail } from '../../controllers/projectDetailController'
import {z} from 'zod'


const projectDetailRoute = Router()

// const projectDetail = z.object({
//     projectName:z.string(),
//     resources:z.object(),
//     sprint:z.object()
// }).strict()

projectDetailRoute.get('/projectdetail', projectdetail.get)
projectDetailRoute.post('/projectdetail', projectdetail.post)




  
export default projectDetailRoute 