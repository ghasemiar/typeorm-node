import { Request, Response } from "express";
import { getcitiesService } from "./Service";

export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await getcitiesService(Number(req.query.provinceId));
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
