import express,{ Router } from "express";
import catchAsync from "../../../services/catchAsync";
import MiddleWare from "../../../middleware/middleware";
import TeacherController from "../../../controller/institute/teacher/teacherController";
import upload from "../../../middleware/multerUpload";



const router:Router =express.Router();

router.route("/")
.post(catchAsync(MiddleWare.isLoggedIn),upload.single("teacherImage"), catchAsync(TeacherController.createTeacher))
.get(catchAsync(MiddleWare.isLoggedIn), catchAsync(TeacherController.getTeachers))
router.route("/:id")
.get(catchAsync(MiddleWare.isLoggedIn), catchAsync(TeacherController.getSingleTeacher))
.delete(catchAsync(MiddleWare.isLoggedIn), catchAsync(TeacherController.deleteTeacher));
export default router;