import express, { Router } from "express";
import instituteController from "../../controller/institute/instituteController";

const router:Router = express.Router()

router.route("/create").post(instituteController.createInstitute)

export default router