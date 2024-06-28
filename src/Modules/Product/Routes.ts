import {
  authenticateUser,
  authorizeUser,
} from "../../Middleware/AuthMiddleware";
import { Router, Request } from "express";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsOfUser,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { ProductCreateDTO, ProductUpdateDTO } from "./DTO";
import { chantgeStatus } from "./Admin.controller";
import { Upload } from "../../Helper/Multer";
const router = Router();
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post(
  "/product",
  authenticateUser,
  Upload.single("image"),
  dtoValidationMiddleware(ProductCreateDTO),
  createProduct,
);
router.put(
  "/product/:id",
  authenticateUser,
  Upload.single("image"),
  dtoValidationMiddleware(ProductUpdateDTO),
  updateProduct,
);
router.delete("/product/:id", authenticateUser, deleteProduct);
router.get("/user-products", authenticateUser, getProductsOfUser);
router.put(
  "/product-change-status/:id",
  authenticateUser,
  authorizeUser,
  chantgeStatus,
);
export default router;
