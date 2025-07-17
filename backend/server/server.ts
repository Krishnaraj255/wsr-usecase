import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectionDb from '../config/db'
import employeeRoute from './routes/employee/employeeRoute'
import projectRoute from './routes/project/projectDetailRoute'
import roleRoute from './routes/role/roleRouter'
dotenv.config()

const app = express()
connectionDb()
app.use(express.json())
app.use(cors())
app.use('/api/ws-report', employeeRoute)
app.use('/api/ws-report', projectRoute)
app.use('/api/ws-report', roleRoute)

const port = process.env.PORT
if (!port) {
    throw "Port number is not defined"
}
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})