import {
  authenticateUser,
  authorizeUser,
} from "../../Middleware/AuthMiddleware";
import { Router } from "express";
const router = Router();
import { getJobs, getJob, createJob, deleteJob, updateJob } from "./Controller";
import { dtoValidationMiddleware } from "../../Middleware/InputValidation";
import { JobUpdateDTO, JobCreateDTO } from "./DTO";
router.get("/job", getJobs);
router.get("/job/:id", authenticateUser, getJob);
router.post(
  "/job",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(JobCreateDTO),
  createJob,
);
router.put(
  "/job/:id",
  authenticateUser,
  authorizeUser,
  dtoValidationMiddleware(JobUpdateDTO),
  updateJob,
);
router.delete("/job/:id", authenticateUser, deleteJob);
export default router;
