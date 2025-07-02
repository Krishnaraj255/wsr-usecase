import { NextFunction, Request, Response } from "express";
import employeeModel from "../../data/models/employeeModel";
import employeevalidation from "../../data/dataValiation/empoyeeValidation";


const post = async (req: Request, res: Response, next: NextFunction) => {
    let employeeNames: string[] = req.body.employeeNames
    
    employeevalidation(employeeNames)

}


const get = async (req: Request, res: Response) => {
    try {
        const employees = await employeeModel.find(
            { employeeNames: { $type: "string" } },
            { employeeId: 1, employeeNames: 1, _id: 0 }
        );
        const formatted = employees.map((emp) => ({
            id: emp.employeeId,
            employees: emp.employeeNames
        }));

        res.status(200).json(formatted);
    } catch (error) {
        res.send("Error fetching employee data");
    }
};

export const employee = {
    post,
    get
}