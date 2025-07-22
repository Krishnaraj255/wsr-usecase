import { NextFunction, Request, Response } from "express";
import { Role } from "../../../data/role/role";
import { role as roledata} from "../../../business/role/role";

const post = async (req: Request, res: Response, next: NextFunction) => {
    const { roleName } = req.body
    try {
        await Role.create(roleName)
        res.status(201).end("Role created successfully")
    } catch (error) {
        res.status(500).send("Data insertion failed")
    }
}

const get = async (req: Request, res: Response) => {
    try { 
        const data = await roledata.get()
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send("Error fetching data")
    }
}

export const role = {
    post, 
    get 
}

