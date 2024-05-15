import { authenticateUser } from "../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../Controller/CategoryController";
import { dtoValidationMiddleware } from "../Middleware/InputsValidation";
import {
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../Validation/CategoryValidation";
router.get("/category", authenticateUser, getCategories);
router.get("/category/:id", authenticateUser, getCategory);
router.post(
  "/category",
  authenticateUser,
  dtoValidationMiddleware(CategoryCreateDTO),
  createCategory,
);
router.put(
  "/category/:id",
  authenticateUser,
  dtoValidationMiddleware(CategoryUpdateDTO),
  updateCategory,
);
router.delete("/category/:id", authenticateUser, deleteCategory);
export default router;
