import {
  authenticateUser,
  authorizeUser,
} from "../../Middleware/AuthMiddleware";
import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { ProfileCreateDTO, ProfileUpdateDTO } from "./DTO";
import { Upload } from "../Product/Routes";
const router = Router();
router.get("/profile", authenticateUser, getProfile);
router.post(
  "/profile",
  authenticateUser,
  Upload.single("image"),
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
