
//class based approach
import { Request, Response } from 'express'
import User from '../../../database/models/user.model'

class AuthController{
    static async registerUser (req:Request,res:Response){

        const {userName,password,email}=req.body
        
        if(userName && password && email){
            res.status(400).json({
                message:"Please provide userName,password and email",
                success:false
            })
            return
        }
        await User.create({
            username:userName,
            email:email,
            password:password
        })
        res.status(200).json({
            message:"User registered successfully",
            success:true
        })
    }
}
export default AuthController
