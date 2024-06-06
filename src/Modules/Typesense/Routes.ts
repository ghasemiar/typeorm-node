import { Router } from "express";
import { authenticateUser, authorizeUser} from "../../Middleware/AuthMiddleware";
import {
  showCollections,
  deleteCollection,
  showCollection,
} from "./Controller";

const router = Router();
router.get("/typesense",authenticateUser,authorizeUser, showCollections);
router.delete("/typesense/:name", authenticateUser,authorizeUser,deleteCollection);
router.get("/typesense/:name", authenticateUser,authorizeUser,showCollection);
export default router;
