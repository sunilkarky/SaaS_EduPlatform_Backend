import express, { Router } from "express";
import catchAsync from "../../services/catchAsync";
import { teacherLogin } from "../../controller/teacher/teacherController";

const router:Router =express.Router();

router.route("/").post(catchAsync(teacherLogin));

export default router;