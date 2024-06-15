import { authenticateUser, authorizeUser} from "../../Middleware/AuthMiddleware";
import {Request,Response, Router} from "express";
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
import {Category} from "./Entity";
import {myDataSource} from "../../Database/Connection";
import {Product} from "../Product/Entity";
import {Brand} from "../Brand/Entity";
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
router.get('/category-test/:id',async (req:Request,res:Response) =>{
    const productRepository = await myDataSource.getRepository(Product);
    const categoryRepository = await myDataSource.getRepository(Category);
    const brand = await myDataSource.getRepository(Brand).findBy({id:Number(req.params.id)})
    // Get products by brand
    const products = await productRepository.find({
        where: { brand:brand },
        relations: ["category"]
    });
    // Extract unique category IDs from products
    const categoryIds = Array.from(new Set(products.map(product => product.category.id)));

    // Get the category tree for the filtered categories
    const categories = await categoryRepository.findByIds(categoryIds);
    // Get the complete category trees
    const categoryTrees = await Promise.all(categories.map(async (category) => {
        return await myDataSource.getTreeRepository(Category).findAncestorsTree(category);
    }));
    res.status(200).json(categoryTrees)
})
export default router;
