import { randomUUID } from "crypto"
import roleModel from "../models/roleModel"

const create = async (roleName: string[]) => {

    try {
        const role = roleName.map((name: string) => ({
            roleId: randomUUID(),
            roleName: name
        }))

        await roleModel.insertMany(role) 
    } 
    catch (error) {
        throw error
    }
}

const get = async () => {

    try {
        return roleModel.find({})
    }
    catch (error) {
        throw error
    }

}

export const Role = {
    create,
    get
}