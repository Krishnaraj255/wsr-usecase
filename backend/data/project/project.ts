import projectDetailModel from "../models/project";
import { randomUUID } from 'crypto';
import projectType from "../../types";

const save = async (data: any) => {

    const updatedData = {
        ...data,
        ...(data.projectId ? { projectId: data.projectId } : { projectId: randomUUID() })

    }
    try {
        const existingProject = await projectDetailModel.findOne({ projectId: updatedData.projectId });

        if (existingProject) {
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
        throw error
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

// const put = async (id:string) => {
//     try{
//       const isprojectExist = await projectDetailModel.findById({projectId:id})
//         if(!isprojectExist){

//         }
//     }
// }

export const Project = {
    save,
    get
}