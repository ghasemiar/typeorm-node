import { Request, Response } from "express";
import {
    changeRoleService,
    loginUserService,
    registerUserService,
} from "./Service";

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { data, code, msg, token } = await registerUserService(req.body);
        res.status(code).json({ data, msg, token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, code, msg, token } = await loginUserService(req.body);
        res.status(code).json({ data, msg, token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
export const changeRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { code, msg } = await changeRoleService(Number(id));
        res.status(code).json(msg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
