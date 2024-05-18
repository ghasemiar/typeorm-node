import { Request, Response } from 'express';

import {
    getCategoryService,createCategoryService,deleteCategoryService,getCategoriesService,updateCategoryService
} from "../Services/CategoryService";

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code} = await createCategoryService(req.body);
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code} = await getCategoriesService()
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await getCategoryService(Number(id));
        res.status(code).json(data)
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await updateCategoryService(Number(id),req.body);
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await deleteCategoryService(Number(id))
        res.status(code).json(data)
        res.status(204).send();
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};