import { authenticateUser } from "../../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
    getBrands,
    createBrand,
    getBrand,
    deleteBrand,
    updateBrand,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { BrandCreateDTO, BrandUpdateDTO } from "./DTO";
router.get("/brand", getBrands);
router.get("/brand/:id", authenticateUser, getBrand);
router.post(
    "/brand",
    authenticateUser,
    dtoValidationMiddleware(BrandCreateDTO),
    createBrand
);
router.put(
    "/brand/:id",
    authenticateUser,
    dtoValidationMiddleware(BrandUpdateDTO),
    updateBrand
);
router.delete("/brand/:id", authenticateUser, deleteBrand);
export default router;
