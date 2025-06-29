
//class based approach
import { Request, Response } from 'express'
import User from '../../../database/models/user.model'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import generateJwtToken from '../../../services/generateJwtToken'

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
        const [data]  =await User.findAll({
            where  :{
                email:email
            }
        })
        if(data){
            res.status(400).json({
                message:"User with that email already exists"
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
    static async loginUser(req:Request,res:Response){
        if (req.body== undefined){
            res.status(400).json({
                message:"No data in body"
            })
            return
        }
        const {email,password}=req.body
        if(!email || !password){
            res.status(400).json({
                message:"Please provide email and password"
            })
            return
        }
        const userExist=await User.findAll({
            where:{
                email:email
        }
        })
        if(userExist.length == 0){
            res.status(404).json({
                message:"User with that email doesn't exist"
            })
            return
        }
        const isValid=bcrypt.compareSync(password,userExist[0].password)
        if(!isValid){
             res.status(403).json({
                message:"Invalid email or password credentials"
            })
            return
        }
         const token=generateJwtToken({id:userExist[0].id})
         console.log(token)
         res.status(200).json({
                token : token,
                message : "Logged in successfully"
            })
    }
}
export default AuthController
