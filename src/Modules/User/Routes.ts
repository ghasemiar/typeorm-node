import { loginUser, registerUser } from "./Controller";
import { Router } from "express";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { UserLoginDto, UserRegisterDTO } from "./DTO";
import { authenticateUser, authorizeUser } from "../../Middleware/AuthMiddleware";

const router = Router();
router.post(
    "/user/register",
    dtoValidationMiddleware(UserRegisterDTO),
    registerUser
);
router.post("/user/login", dtoValidationMiddleware(UserLoginDto), loginUser);

router.post(
    "/user/change-role/:id",
    authenticateUser,
    authorizeUser,
    loginUser
);

export default router;
