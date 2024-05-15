import { Request, Response } from "express";

// import {
//     createAttrService,
//     deleteAttrService,
//     getAttrService,
//     getAttrsService,
//     updateAttrService,
// } from "../Services/AttrService";

export const createAttr = async (
    req: Request,
    // res: Response,
): Promise<void> => {
    console.log(req.body)
    // try {
    //     const { data, code } = await createAttrService(req.body);
    //     res.status(code).json(data);
    // } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    // }
};

export const getAttrs = async (req: Request, res: Response): Promise<void> => {
    // try {
    //     const { data, code } = await getAttrsService();
    //     res.status(code).json(data);
    // } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    // }
};

export const getAttr = async (req: Request, res: Response): Promise<void> => {
    // try {
    //     const { id } = req.params;
    //     const { data, code } = await getAttrService(id);
    //     res.status(code).json(data);
    // } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    // }
};

export const updateAttr = async (
    req: Request,
    // res: Response,
): Promise<void> => {
    console.log(req.body,req.params)
    // try {
    //     const { id } = req.params;
    //     const { data, code } = await updateAttrService(id, req.body);
    //     res.status(code).json(data);
    // } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    // }
};

export const deleteAttr = async (
    req: Request,
    // res: Response,
): Promise<void> => {
    console.log(req.params)
    // try {
    //     const { id } = req.params;
    //     const { data, code } = await deleteAttrService(id);
    //     res.status(code).json(data);
    //     res.status(204).send();
    // } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    // }
};
