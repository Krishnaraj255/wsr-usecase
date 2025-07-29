import projectDetailModel from "../models/project";
import { randomUUID } from 'crypto';
import { projectType } from "../../types";


const save = async (data: projectType) => {
    const updatedData = {
        ...data,
        ...(data.projectId ? { projectId: data.projectId } : { projectId: randomUUID() })
    }
    try {
        const existingProject = await projectDetailModel.findOne({ projectId: updatedData.projectId });

        if (existingProject) {
            // const existingSprint = existingProject?.sprint ?? null

            // console.log("exist", existingSprint)
            // console.log("upd", updatedData.sprint)

            // const update = { 
            //     ...updatedData,
            //     // sprint: updatedData.sprint
            // }
            existingProject.set(updatedData);

            await existingProject.save()
            return existingProject;
        } else {
            const newProject = new projectDetailModel(updatedData);
            await newProject.save();
            return newProject;
        }
    }
    catch (error) {
        console.log(error)
    }
}
const get = async () => {
    try {
        const project = await projectDetailModel.find()
        return project
    }
    catch (error) {
        throw error
    }

}

export const Project = {
    save,
    get
}