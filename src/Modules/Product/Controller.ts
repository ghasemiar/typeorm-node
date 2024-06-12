import { Request, Response } from "express";

import {
    allUserProductsService,
    createProductService,
    deleteProductService,
    getProductService,
    updateProductService,
} from "./Service";
import { AuthRequest } from "../../Middleware/AuthMiddleware";
import searchProducts from "../../Repository/ProductRepo";
import {typesense} from "../../Typesense/Config";

export const createProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const imagePath = req.file ? req.file.filename : undefined;
        const { data, code } = await createProductService(req.body, req.user,imagePath);
        res.status(code).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const query = req.query.q as string;
    const filters = {
        year: req.query.year,
        price: {
            min: req.query.price_min,
            max: req.query.price_max,
        },
        brand: req.query.brand,
        category: req.query.category,
    };
    const sort = req.query.sort as string;
    try {
        const results = await searchProducts(query, filters, sort);
        res.json(results);
    } catch (error) {
        res.status(500).send("Error performing search");
    }
};

export const getProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { data, code } = await getProductService(Number(id));
        res.status(code).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const imagePath = req.file ? req.file.filename : undefined;
        const { data, code } = await updateProductService(Number(id),req.user, req.body,imagePath);
        res.status(code).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { data, code } = await deleteProductService(Number(id),req.user);
        res.status(code).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const getProductsOfUser = async (req:AuthRequest,res:Response) =>{
    try {
        const userId = req.user.id
        const {data,code} = await allUserProductsService(userId)
        res.status(code).json(data)
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}
