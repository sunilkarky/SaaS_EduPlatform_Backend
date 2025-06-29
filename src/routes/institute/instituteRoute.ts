import express, { Router } from "express";
import instituteController from "../../controller/institute/instituteController";
import MiddleWare from "../../middleware/middleware";
import catchAsync from '../../services/catchAsync'

const router:Router = express.Router()

router.route("/").post(
    catchAsync(MiddleWare.isLoggedIn),
    catchAsync(instituteController.createInstitute),
    catchAsync(instituteController.createTeacher),
    catchAsync(instituteController.createStudent),
    catchAsync(instituteController.createCategory),
    catchAsync(instituteController.createCourse)
)
.get(
    catchAsync(MiddleWare.isLoggedIn),
    catchAsync(instituteController.getUserInstitutes)
)

export default router