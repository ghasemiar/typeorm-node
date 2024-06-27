import { Request, Response } from "express";
import { getProvineService } from "./Service";

export const getProvince = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await getProvineService();
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
