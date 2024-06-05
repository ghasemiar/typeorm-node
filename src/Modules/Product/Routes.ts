import { authenticateUser } from "../../Middleware/AuthMiddleware";
import { Router,Request } from "express";
import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct, getProductsOfUser,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import {
    ProductCreateDTO,
    ProductUpdateDTO,
} from "./DTO";

import multer from "multer";
import path from "path";
const router = Router();
const storage = multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,cb) =>{
        cb(null,'src/storage/')
    },
    filename(req:Request , file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
export const Upload:multer.Multer = multer({storage})

router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post(
    "/product",
    authenticateUser,
    Upload.single('image'),
    dtoValidationMiddleware(ProductCreateDTO),
    createProduct
);
router.put(
    "/product/:id",
    authenticateUser,
    Upload.single('image'),
    dtoValidationMiddleware(ProductUpdateDTO),
    updateProduct
);
router.delete("/product/:id", authenticateUser, deleteProduct);
router.get("/products-user",authenticateUser, getProductsOfUser);
export default router;
