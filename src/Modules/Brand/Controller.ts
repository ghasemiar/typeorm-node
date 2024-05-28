import { Request, Response } from 'express';

import {
    getBrandService,createBrandService,deleteBrandService,updateBrandService,getBrandsService
} from "./Service";

export const createBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code} = await createBrandService(req.body);
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getBrands = async (req: Request, res: Response): Promise<void> => {
    try {
        const {data,code} = await getBrandsService()
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await getBrandService(Number(id));
        res.status(code).json(data)
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await updateBrandService(Number(id),req.body);
        res.status(code).json(data);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {data,code} = await deleteBrandService(Number(id))
        res.status(code).json(data)
        res.status(204).send();
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};