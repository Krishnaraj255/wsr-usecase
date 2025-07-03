import projectDetailModel from "../models/project";

const create = async (data: any) => {

    try {
        const newProject = new projectDetailModel(data)
        await newProject.save();
    }
    catch (error) {
        throw error
    }
}

const get = async () => {
    try{
        const project = await projectDetailModel.find({})
        return project
    }
    catch(error){
        throw error
    }

}

export const Project = {
    create,
    get
}