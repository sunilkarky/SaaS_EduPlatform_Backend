
//class based approach
import { Request, Response } from 'express'
import User from '../../../database/models/user.model'
import bcrypt from "bcrypt"

class AuthController{
    static async registerUser (req:Request,res:Response){
        if (req.body== undefined){
            res.status(400).json({
                message:"No data in body"
            })
            return
        }
        const {userName,password,email}=req.body
        if(!userName && !password && !email){
            res.status(400).json({
                message:"Please provide userName,password and email",
                success:false
            })
            return
        }
        await User.create({
            username:userName,
            email:email,
            password : bcrypt.hashSync(password,12), 
        })
        res.status(201).json({
            message:"User registered successfully",
            success:true
        })
    }
}
export default AuthController
