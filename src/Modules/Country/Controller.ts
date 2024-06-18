import { Request, Response } from "express";

import {
  getCountryService,
  createCountryService,
  deleteCountryService,
  updateCountryService,
  getCountrysService,
} from "./Service";

export const createCountry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await createCountryService(req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountrys = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await getCountrysService();
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await getCountryService(Number(id));
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCountry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await updateCountryService(Number(id), req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCountry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await deleteCountryService(Number(id));
    res.status(code).json(data);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
