import { Request, Response } from "express";

import {
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from "../Services/ProductService";
import { AuthRequest } from "../Middleware/AuthMiddleware";
import searchProducts from "../Repository/ProductRepo";

export const createProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    console.log(req.user);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data, code } = await createProductService(req.body, req.user.id);
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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await updateProductService(Number(id), req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await deleteProductService(Number(id));
    res.status(code).json(data);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
