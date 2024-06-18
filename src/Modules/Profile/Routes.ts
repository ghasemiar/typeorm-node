import {
  authenticateUser,
  authorizeUser,
} from "../../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { ProfileCreateDTO, ProfileUpdateDTO } from "./DTO";
router.get("/profile", getProfile);
router.post(
  "/profile",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(ProfileCreateDTO),
  createProfile,
);
router.put(
  "/profile",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(ProfileUpdateDTO),
  updateProfile,
);
router.delete("/profile", authenticateUser, deleteProfile);
export default router;
