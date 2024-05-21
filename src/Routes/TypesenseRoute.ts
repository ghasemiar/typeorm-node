import { Router } from "express";
import {showCollection,deleteCollection} from "../Controller/TypesenseController";

const router = Router();
router.get("/typesense",showCollection);
router.delete("/typesense/",deleteCollection);
export default router;