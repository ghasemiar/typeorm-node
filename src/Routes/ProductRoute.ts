import { authenticateUser } from "../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/ProductController";
import { dtoValidationMiddleware } from "../Middleware/InputValidation";
import {
  ProductCreateDTO,
  ProductUpdateDTO,
} from "../Validations/ProductValidation";
router.get("/product", authenticateUser, getProducts);
router.get("/product/:id", authenticateUser, getProduct);
router.post(
  "/product",
  authenticateUser,
  dtoValidationMiddleware(ProductCreateDTO),
  createProduct,
);
router.put(
  "/product/:id",
  authenticateUser,
  dtoValidationMiddleware(ProductUpdateDTO),
  updateProduct,
);
router.delete("/product/:id", authenticateUser, deleteProduct);
export default router;
