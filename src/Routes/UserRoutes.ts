import { loginUser, registerUser } from "../Controller/UserController";
import { Router } from "express";
import { dtoValidationMiddleware } from "../Middleware/InputValidation";
import { UserLoginDto, UserRegisterDTO } from "../Validations/UserValidation";

const router = Router();
router.post(
  "/register",
  dtoValidationMiddleware(UserRegisterDTO),
  registerUser,
);
router.post("/login", dtoValidationMiddleware(UserLoginDto), loginUser);
export default router;
