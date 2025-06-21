import express, { Router } from "express";
import MiddleWare from "../../../middleware/middleware";
import courseController from "../../../controller/institute/course/courseController";
import catchAsync from "../../../services/catchAsync";
// import { multer, storage } from "../../../middleware/multerConfig";

import multer from "multer";
import { cloudinary,storage } from "../../../services/cloudinaryConfig";


const router:Router=express.Router()

const upload =multer({
    storage:storage,
    limits:{
        fileSize:4*1024*1024

    }
})

router.route('/')
.post(catchAsync(MiddleWare.isLoggedIn),upload.single('courseThumbnail'),catchAsync(courseController.createCourse))
.get(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.getAllCourses))

router.route("/:id").get(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.getSingleCourse))
.delete(catchAsync(MiddleWare.isLoggedIn),catchAsync(courseController.deleteCourse))

export default router