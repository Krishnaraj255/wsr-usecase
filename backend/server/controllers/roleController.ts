import mongoose from "mongoose";
import roleModel from "../../data/models/roleModel";
import { Request, Response } from "express";
import { randomUUID } from "crypto";


const post = async (req: Request, res: Response) => {

    let roleName = req.body.roleName

    try {
        const role = roleName.map((name: string) => ({
            roleId: randomUUID(),
            roleName: name
        }))

        await roleModel.insertMany(role)

        res.status(201).send("role added successfully")
    }
    catch (error) {
        res.status(400).json({ error: "erorr while adding role" })
    }
}




const get = async (req: Request, res: Response) => {
    const data = await roleModel.find({})

    res.send(data)
}



export const role = {
    get,
    post
}

