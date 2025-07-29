import { randomUUID } from "crypto"
import employeeModel from "../models/employeeModel"
import { employeeType } from "../../types"


const create = async (employeeNames: string[]) => {
    try {
        const employee = employeeNames.map((name: string) => ({
            employeeId: randomUUID(),
            employeeNames: name
        }))
        await employeeModel.insertMany(employee)
    }
    catch (error) {
        throw error
    }
}

const get = async () => {
    try {
        return employeeModel.find({});
    } catch (error) {
        throw error;
    }
}

export const Employee = {
    create,
    get
}