import employeeModel from "../models/employeeModel"
import { randomUUID } from "crypto"

const employeevalidation = async (employeeNames: string[])=> {
    try {
        const employee = employeeNames.map((name: string) => ({
            employeeId: randomUUID(),
            employeeNames: name
        }))

        await employeeModel.insertMany(employee)
          
        console.log("success")

        return true
    }
    catch (erorr) {
        console.log("Error")

        return false

    }

}

export default employeevalidation