import { Router } from "express";
import {
  showCollections,
  deleteCollection,
  showCollection,
} from "./Controller";

const router = Router();
router.get("/typesense", showCollections);
router.delete("/typesense/", deleteCollection);
router.get("/typesense/:name", showCollection);
export default router;
