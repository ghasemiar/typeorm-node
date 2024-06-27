import { Router } from "express";
import { getCities } from "./Controller";
const router = Router();
router.get("/city", getCities);
export default router;
