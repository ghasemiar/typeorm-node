import { Request, Response } from "express";

import {
  createProfileService,
  deleteProfileService,
  getNearbyUserService,
  getProfileService,
  updateProfileService,
} from "./Service";
import { AuthRequest } from "../../Middleware/AuthMiddleware";

export const createProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await createProfileService(req.body, req.user.id);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const getProfiles = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { data, code } = await getProfilesService();
//     res.status(code).json(data);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await getProfileService(req.user.id);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await updateProfileService(req.user.id, req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { data, code } = await deleteProfileService(req.user.id);
    res.status(code).json(data);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getNearbyUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      res.status(400).send("Missing query parameters");
    }
    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);
    const rad = parseFloat(radius as string);
    const { data, code } = await getNearbyUserService(lat, lon, rad);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
