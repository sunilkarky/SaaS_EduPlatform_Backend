import express, { Router } from "express";
import MiddleWare from "../../../middleware/middleware";
import courseController from "../../../controller/institute/course/courseController";
import catchAsync from "../../../services/catchAsync";

const router:Router=express.Router()

router.route('/')
.post(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.createCourse))
.get(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.getAllCourses))

router.route("/:id").get(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.getSingleCourse))
.delete(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.deleteCourse))

export default router