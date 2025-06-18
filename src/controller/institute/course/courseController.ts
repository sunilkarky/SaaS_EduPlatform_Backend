import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

class courseController{
    static async createCourse(req:IExtendedRequest,res:Response){
        const instituteNumber = req.user?.currentInstituteNumber;
        if(req.body==undefined){
        res.status(400).json({
          message:"Please provide body"
        })
        return
      }
        const {courseName,coursePrice,courseDuration,courseLevel,courseDescription}=req.body
        if(!courseName || !coursePrice || !courseDuration || !courseLevel || !courseDescription){
            res.status(400).json({
                message:"Please provide all fields: courseName, coursePrice, courseDuration, courseLevel, courseDescription"
            })
            return
        }
        const [course] =await sequelize.query(`INSERT INTO course_${instituteNumber}(
            courseName, coursePrice, courseDuration, courseLevel, courseDescription
        ) VALUES (?,?,?,?,?)`, {
            replacements: [courseName, coursePrice, courseDuration, courseLevel, courseDescription]
        })

        res.status(201).json({
            message:"Course created successfully",
           
        })

    }
    static async getAllCourses(req:IExtendedRequest,res:Response){
        const instituteNumber = req.user?.currentInstituteNumber;
        console.log(instituteNumber)
        const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`
        );
        res.status(200).json({
            message: "Courses fetched successfully",
            data: courses
        });
    }
    static async getSingleCourse(req:IExtendedRequest,res:Response){
        const instituteNumber=req.user?.currentInstituteNumber
        const courseId =req.params.id
        if(!courseId){
            res.status(400).json({
                message:"please provide id in parameter"
            })
            return
        }
        //check course exists
        const [courseExist]=await sequelize.query(`SELECT * FROM COURSE_${instituteNumber} WHERE id=?`,{
            replacements:[courseId]
        })
        if(courseExist.length==0){
            res.status(404).json({
                message:"No course with that id.",
            })
            return
        }
        res.status(200).json({
            message:"Single user fetched success",
            data:courseExist
        })
    }
    static async deleteCourse(req:IExtendedRequest,res:Response){
        const instituteNumber=req.user?.currentInstituteNumber
        const courseId=req.params.id
         if(!courseId){
            res.status(400).json({
                message:"please provide id in parameter"
            })
            return
        }
        //check course exists
        const [courseExist]=await sequelize.query(`SELECT * FROM COURSE_${instituteNumber} WHERE id=?`,{
            replacements:[courseId]
        })
        if(courseExist.length==0){
            res.status(404).json({
                message:"No course with that id.",
            })
            return
        }
        await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=?`,{
            replacements:[courseId]
        })
        res.status(200).json({
            message:"Course deleted successfully"
        })
    }
}
export default courseController