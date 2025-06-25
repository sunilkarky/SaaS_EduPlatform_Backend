import express,{Router} from 'express'
import AuthController from '../../../controller/globals/auth/auth.controller'
import catchAsync from '../../../services/catchAsync'

const router:Router = express.Router()


router.route("/register").post(catchAsync(AuthController.registerUser))
router.route("/login").post(catchAsync(AuthController.loginUser))

export default router