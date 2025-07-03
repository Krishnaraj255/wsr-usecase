import { Request, Response } from 'express'
import projectDetailModel from "../../../data/models/project";
import { randomUUID } from 'crypto';
import { Project } from '../../../data/project/project';

const post = async (req: Request, res: Response) => {
    const data = {
        projectId: randomUUID(),
        projectName: req.body.projectName,
        resources: req.body.resources,
        sprint: req.body.sprint
    }
    try {
        await Project.create(data)
        res.status(201).end("Project created successfully")
    }
    catch (error) {
        res.status(500).send("Data insertion failed")
    }
}

const get = async (req: Request, res: Response) => {
    try {
        const data = await Project.get()
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send("Error fetching data")
    }
}



export const projectdetail = {
    get,
    post
}