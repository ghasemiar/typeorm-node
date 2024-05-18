import { Request, Response } from 'express';
import {loginUserService, registerUserService} from "../Services/UserService";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code,msg,token} = await registerUserService(req.body)
        res.status(code).json({data, msg, token});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code,msg,token} = await loginUserService(req.body);
        res.status(code).json({data, msg, token});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};