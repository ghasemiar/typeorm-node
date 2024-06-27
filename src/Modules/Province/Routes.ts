import { Router } from "express";
import { getProvince } from "./Controller";
const router = Router();
router.get("/province", getProvince);
export default router;
