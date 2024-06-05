import {Request,Response} from "express";
import {changeStatusService} from "./Admin.service";

export const chantgeStatus = async (req:Request,res:Response) => {
    try {
        const status = req.body.status
        const id = Number(req.params.id)
        const {msg,code} = await changeStatusService(id,status)
        res.status(code).json(msg)
    }catch (err) {
        res.status(500).json(err)
    }
}