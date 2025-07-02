import { Request, Response } from 'express'
import projectDetailModel from "../../data/models/projectDetailModel";
import { randomUUID } from 'crypto';

const get = async (req: Request, res: Response) => {
    const data = await projectDetailModel.find({})
    res.send(data)

} 

const post = async (req: Request, res: Response) => {

    const projectId = randomUUID()
    const data = {
        projectId:projectId,
        projectName: req.body.projectName,
        resources: req.body.resources,
        sprint: req.body.sprint
    }
    try {
        const newProject = new projectDetailModel(data)
        await newProject.save();
        res.status(201).send("project added successfully")
    }
    catch (error) {
        res.status(400).json({ error: "error while adding data" })
    }
}

export const projectdetail = {
    get,
    post
}