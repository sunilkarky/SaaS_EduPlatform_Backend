import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/user.model";
import { IExtendedRequest } from "./type";

// interface success{
//     id:string,
//     iat:number,
//     exp:number
// }

class MiddleWare{
    static async isLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction):Promise<void>{
        //accept token
        const token =req.headers.authorization
        if(!token){
            res.status(403).json({
                message:"Please provide token to continue"
            })
            return
        }
        //verify token
        jwt.verify(token,"iamsecretkey",async(error,success:any)=>{  //callback (iferror,ifsuccess 2 args)
            if(error){
                res.status(403).json({
                    message:"Invalid token"
                })
                return
            }
        const {id}=success
        const userData=await User.findAll({
            where:{
                id:id
                }
            })
        if(userData.length==0){
            res.status(403).json({
                message:"User with that id doesn't exist ,Invalid token"
            })
            return
        }
        req.user=userData[0]
        next()
        })

    }
}
export default MiddleWare