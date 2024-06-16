import { Request, Response } from "express";

import {
  getJobService,
  createJobService,
  deleteJobService,
  getJobsService,
  updateJobService,
} from "./Service";

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await createJobService(req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await getJobsService();
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await getJobService(Number(id));
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await updateJobService(Number(id), req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await deleteJobService(Number(id));
    res.status(code).json(data);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
