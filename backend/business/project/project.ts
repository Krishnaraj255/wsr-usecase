import { Project } from "../../data/project/project";

const get = async () => {
    const projectObject = await Project.get()
    return projectObject
}

export const project = {
    get
}