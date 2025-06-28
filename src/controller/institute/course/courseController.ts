import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

class courseController{
    static async createCourse(req:IExtendedRequest,res:Response){
        const instituteNumber = req.user?.currentInstituteNumber;
        if(!req.file){
            res.status(400).json({
                message:"Please upload courseThumbnail"
            })
            return
        }
        const courseThumbnail=req.file ? req.file.filename:null
        // const courseThumbnail=req.file?req.file.path :null
        if(req.body==undefined){
        res.status(400).json({
          message:"Please provide body"
        })
        return
      }
        const {courseName,coursePrice,courseDuration,courseLevel,courseDescription,categoryId}=req.body
        if(!courseName || !coursePrice || !courseDuration || !courseLevel || !courseDescription){
            res.status(400).json({
                message:"Please provide all fields: courseName, coursePrice, courseDuration, courseLevel, courseDescription, categoryId"
            })
            return
        }
        if(!categoryId){
            res.status(400).json({
                message:"Please create course first and provide categoryId"
            })
            return
        }
        const [course] =await sequelize.query(`INSERT INTO course_${instituteNumber}(
            courseName, coursePrice, courseDuration, courseLevel, courseDescription,courseThumbnail, categoryId
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`, {
            type:QueryTypes.INSERT,
            replacements: [courseName, coursePrice, courseDuration, courseLevel, courseDescription,courseThumbnail, categoryId]
        })

        res.status(201).json({
            message:"Course created successfully",
           
        })

    }
    static async getAllCourses(req:IExtendedRequest,res:Response){
        const instituteNumber = req.user?.currentInstituteNumber;
        const courses = await sequelize.query(`
            SELECT c.*, cat.categoryName, cat.categoryDescription 
            FROM course_${instituteNumber} c 
            LEFT JOIN category_${instituteNumber} cat ON c.categoryId = cat.id
        `,{type: QueryTypes.SELECT});
        if(courses.length==0){
            res.status(404).json({
                message:"No courses found "
            });
            return;
        }
        res.status(200).json({
            message: "Courses fetched successfully",
            data: courses
        })
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
        const courseExist=await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
            type:QueryTypes.SELECT,
            replacements:[courseId]
        })
        if(courseExist.length==0){
            res.status(404).json({
                message:"No course with that id hai ta.",
            })
            return
        }
        res.status(200).json({
            message:"Single course fetched success",
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
        const courseExist=await sequelize.query(`SELECT * FROM COURSE_${instituteNumber} WHERE id=?`,{
            type:QueryTypes.SELECT,
            replacements:[courseId]
        })
        if(courseExist.length==0){
            res.status(404).json({
                message:"No course with that id.",
            })
            return
        }
        await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=?`,{
            type:QueryTypes.DELETE,
            replacements:[courseId]
        })
        res.status(200).json({
            message:"Course deleted successfully"
        })
    }
}
export default courseController