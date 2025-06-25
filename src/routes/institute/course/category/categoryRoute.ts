import express, { Router } from "express";
import MiddleWare from "../../../../middleware/middleware";
import catchAsync from "../../../../services/catchAsync";
import categoryController from "../../../../controller/institute/course/category/categoryController";

const router:Router= express.Router();


router.route('/')
.get(MiddleWare.isLoggedIn,catchAsync(categoryController.getAllCategories))
.post(MiddleWare.isLoggedIn,catchAsync(categoryController.createCategory));

router.route('/:id')
.get(MiddleWare.isLoggedIn,catchAsync(categoryController.getSingleCategory))
.delete(MiddleWare.isLoggedIn,catchAsync(categoryController.deleteCategory));

export default router;