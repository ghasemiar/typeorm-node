import { authenticateUser } from "../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  createAttr,
  deleteAttr,
  getAttr,
  getAttrs,
  updateAttr,
} from "../Controller/AttrController";
import { dtoValidationMiddleware } from "../Middleware/InputValidation";
import { AttrCreateDTO, AttrUpdateDTO } from "../Validations/AttrValidation";
router.get("/attributes", authenticateUser, getAttrs);
router.get("/attributes/:id", authenticateUser, getAttr);
router.post(
  "/attributes",
  dtoValidationMiddleware(AttrCreateDTO),
  authenticateUser,
  createAttr,
);
router.put(
  "/attributes/:id",
  dtoValidationMiddleware(AttrUpdateDTO),
  authenticateUser,
  updateAttr,
);
router.delete("/attributes/:id", authenticateUser, deleteAttr);
export default router;
