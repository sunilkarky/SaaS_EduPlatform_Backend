import { error } from "console"
import { NextFunction, Request, Response } from "express"

const catchAsync=(fn:Function)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch((error:Error)=>{
            res.status(500).json({
                message:error.message,
                fullError:error
            })
        })

    }
}
export default catchAsync