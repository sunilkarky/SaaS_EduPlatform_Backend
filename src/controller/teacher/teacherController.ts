import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import generateJwtToken from "../../services/generateJwtToken";

const teacherLogin=async(req:Request,res:Response)=>{
    const {teacherEmail,teacherPassword,instituteNumber}=req.body
    if(!teacherEmail || !teacherPassword || !instituteNumber){
         res.status(400).json({
            message:"Please provide all the required fields teacherEmail, teacherPassword, instituteNumber"
        })
        return;
    }
    //teacherExists check
    const teacherData:{
        id:string
        teacherPassword:string
    }[]=await sequelize.query(`SELECT * FROM teacher_${instituteNumber} WHERE teacherEmail=?`,{
        type: QueryTypes.SELECT,
        replacements: [teacherEmail]
    })
    if(teacherData.length===0){
        res.status(404).json({
            message:"Incorrect email or password credentials"
        })
        return;
    }
    //password check
    const isPasswordMatched=bcrypt.compareSync(teacherPassword, teacherData[0].teacherPassword);
    if(!isPasswordMatched){
        res.status(404).json({
            message:"Incorrect email or password credentials"
        })
        return;
    }
    //generate token
    const token=generateJwtToken({
        id: teacherData[0].id,
        instituteNumber: instituteNumber
    });
    res.status(200).json({
        token: token,
        instituteNumber: instituteNumber,
        message: "Logged in successfully"
    });
}

export {teacherLogin}