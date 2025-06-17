import express, { Router } from "express";
import instituteController from "../../controller/institute/instituteController";
import MiddleWare from "../../middleware/middleware";

const router:Router = express.Router()

router.route("/").post(MiddleWare.isLoggedIn,instituteController.createInstitute)

export default router