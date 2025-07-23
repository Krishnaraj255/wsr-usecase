import { Request, Response } from 'express'
import projectDetailModel from "../../../data/models/project";
import { randomUUID } from 'crypto';
import { Project } from '../../../data/project/project';
import { project } from '../../../business/project/project';



const post = async (req: Request, res: Response) => {
    const data = {
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        resources: req.body.resources,
        sprint: req.body.sprint
    }
    try {
        await Project.save(data)
        res.status(201).end("Project created successfully")
    }
    catch (error) {
        res.status(500).send("Data insertion failed")
    }
}

const get = async (req: Request, res: Response) => {
    try {
        const data = await project.get()
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send("Error fetching data")
    }
}

const getSingleData = async (req: Request, res: Response) => {
    try {
        const id = req.params.projectId;
        const project = await projectDetailModel.findOne({ projectId: id });


        res.status(200).send(project);
    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const projectdetail = {
    get,
    post,
    getSingleData
}