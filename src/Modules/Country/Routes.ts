import {
  authenticateUser,
  authorizeUser,
} from "../../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import {
  getCountrys,
  createCountry,
  getCountry,
  deleteCountry,
  updateCountry,
} from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { CountryCreateDTO, CountryUpdateDTO } from "./DTO";
router.get("/country", getCountrys);
router.get("/country/:id", authenticateUser, getCountry);
router.post(
  "/country",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(CountryCreateDTO),
  createCountry,
);
router.put(
  "/country/:id",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(CountryUpdateDTO),
  updateCountry,
);
router.delete("/country/:id", authenticateUser, deleteCountry);
export default router;
