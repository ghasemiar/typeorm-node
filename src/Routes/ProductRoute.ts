import { authenticateUser } from "../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct, searchProduct,
} from "../Controller/ProductController";
import { dtoValidationMiddleware } from "../Middleware/InputValidation";
import {
  ProductCreateDTO,
  ProductUpdateDTO,
} from "../Validations/ProductValidation";
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post(
  "/product",
  authenticateUser,
  dtoValidationMiddleware(ProductCreateDTO),
  createProduct
);
router.put(
  "/product/:id",
  authenticateUser,
  dtoValidationMiddleware(ProductUpdateDTO),
  updateProduct
);
router.delete("/product/:id", authenticateUser, deleteProduct);
//search filter
router.get("/product-search",searchProduct);

export default router;
