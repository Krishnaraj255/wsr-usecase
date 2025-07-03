import { NextFunction, Request, Response } from "express";
import { Employee } from "../../../data/employee/employee";

const post = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeNames } = req.body
    try {
        await Employee.create(employeeNames)
        res.status(201).end("Employee created successfully")
    } catch (error) {
        res.status(500).send("Data insertion failed")
    }
}

const get = async (req: Request, res: Response) => {
    try {
        const data = await Employee.get()
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send("Error fetching data")
    }
};

export const employee = {
    post,
    get
}