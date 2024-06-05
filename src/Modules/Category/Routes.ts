import { authenticateUser, authorizeUser} from "../../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
    createCategory,
    getCategories,
    deleteCategory,
    getCategory,
    updateCategory,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import {
    CategoryCreateDTO,
    CategoryUpdateDTO,
} from "./DTO";
router.get("/category", getCategories);
router.get("/category/:id", authenticateUser, getCategory);
router.post(
    "/category",
    authenticateUser,
    authorizeUser,
    dtoValidationMiddleware(CategoryCreateDTO),
    createCategory
);
router.put(
    "/category/:id",
    authenticateUser,
    authorizeUser,
    dtoValidationMiddleware(CategoryUpdateDTO),
    updateCategory
);
router.delete("/category/:id", authenticateUser, deleteCategory);
export default router;
