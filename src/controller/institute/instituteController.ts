import { NextFunction, Request, Response } from "express"
import sequelize from "../../database/connection"
import generateRandomNumber from '../../services/randomNumberGenerate'
import { IExtendedRequest } from "../../middleware/type"
import User from "../../database/models/user.model"
import { categories } from "../../seed"



class instituteController{
     static async createInstitute(req:IExtendedRequest,res:Response,next:NextFunction){
        const {instituteName,institutePhoneNumber,instituteEmail,instituteAddress}=req.body
        const instituteVatNo=req.body.instituteVatNo ||null
        const institutePanNo=req.body.institutePanNo || null
        if (!instituteName || !instituteAddress|| !instituteEmail || !institutePhoneNumber ){
            res.status(400).json({
                message:"Please provide instituteName,institutePhoneNumber,instituteEmail,institutePan,instituteAddress "
            })
            return
        }
        const instituteNumber=generateRandomNumber()
        
        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
          id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()) ,
          instituteName VARCHAR(255) NOT NULL,
          instituteEmail VARCHAR(255) NOT NULL UNIQUE,
          institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
          instituteAddress VARCHAR(255) NOT NULL,
          institutePanNo VARCHAR(255),
          instituteVatNo VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )`)
          await sequelize.query(
            `INSERT INTO institute_${instituteNumber}
            (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo)
            VALUES (?, ?, ?, ?, ?, ?)`,
            {
              replacements: [
                instituteName,
                instituteEmail,
                institutePhoneNumber,
                instituteAddress,
                institutePanNo,
                instituteVatNo
              ]
            }
          );
          
    //update instituteNumber after instituteCreated with same random generated number
    if(req.user){
      const id=req?.user?.id
      //user-institute history data of all institute created by user

        await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
          id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()) ,
          userId VARCHAR(36) REFERENCES users(id),
          instituteNumber VARCHAR(255) UNIQUE
          )`)
          await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber)VALUES(?,?)`,{
            replacements:[id,instituteNumber]
          })
          await User.update({
            currentInstituteNumber:instituteNumber,
            role:"institute"
          },{
            where :{
              id:id
            }
          })
        
     if(req.user){
              req.user.currentInstituteNumber = instituteNumber  
          }
      next()
    }
    }

    //create table
    static async createTeacher(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteNumber=req.user?.currentInstituteNumber;
      // const{teacherName,teacherEmail,teacherPhoneNumber,teacherAddress}=req.body
      // if(req.body==undefined){
      //   res.status(400).json({
      //     message:"Please provide body"
      //   })
      //   return
      // }
      // if(!teacherName||!teacherEmail||!teacherPhoneNumber||!teacherAddress){
      //   res.status(400).json({
      //     message:"Please provide teacherName,teacherEmail,teacherPhoneNumber,teacherAddress"
      //   })

      // }
      await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()) ,
        teacherName VARCHAR(255) NOT NULL,
        teacherEmail VARCHAR(255) NOT NULL UNIQUE,
        teacherPhoneNumber VARCHAR(255) NOT NULL,
        teacherAddress VARCHAR(255) NOT NULL,
        teacherExpertise varchar(255),
        joinedDate DATE,
        salary VARCHAR(255),
        teacherImage VARCHAR(255),
        teacherPassword VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

      // await sequelize.query(`INSERT INTO  teacher_${instituteNumber}(
      //   teacherName,
      //   teacherEmail,
      //   teacherPhoneNumber,
      //   teacherAddress
      //   )VALUES(?,?,?,?)`,{
      //     replacements:[teacherName,teacherEmail,teacherPhoneNumber,teacherAddress]
      //   }
      // )
      next()
    }
    static async createStudent(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteNumber=req.user?.currentInstituteNumber;
      // const {studentName,studentEmail,studentPhoneNumber,studentAddress}=req.body
      // if(!studentName||studentEmail||studentPhoneNumber||studentAddress){
      //   res.status(400).json({
      //     message:"Please provide all fields studentName,studentEmail,studentPhoneNumber,studentAddress"
      //   })
      //   return
      // }
      await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()) ,
        studentName VARCHAR(255) NOT NULL,
        studentEmail VARCHAR(255) NOT NULL UNIQUE,
        studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        studentAddress TEXT NOT NULL,
        enrolledDate DATE,
        studentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

      // await sequelize.query(`INSERT INTO student_${instituteNumber}(
      //   studentName,studentEmail,studentPhoneNumber,studentAddress
      //   )VALUES(?,?,?,?)`,{
      //     replacements:[studentName,studentEmail,studentPhoneNumber,studentAddress]
      //   }
      // )
      next()
    }
    static async createCourse(req:IExtendedRequest,res:Response){
      const instituteNumber=req.user?.currentInstituteNumber;
      //course-table
      await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID())  ,
        courseName VARCHAR(255) NOT NULL UNIQUE,
        coursePrice VARCHAR(255) NOT NULL ,
        courseDuration VARCHAR(255) NOT NULL,
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
        courseThumbnail VARCHAR(200),
        courseDescription TEXT,
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber}(id),
        teacherId VARCHAR(36)  REFERENCES teacher_${instituteNumber}(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
        res.status(200).json({
          message:"Institute Created Successfully",
          instituteNumber,
        })
    }
    static async createCategory(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteNumber= req.user?.currentInstituteNumber;
      if(!instituteNumber){
        res.status(400).json({
          message:"Please provide instituteNumber"
        })
        return
      }
      await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
       id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()) ,
       categoryName VARCHAR(255) NOT NULL UNIQUE,
       categoryDescription TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )`)
        
      categories.forEach(async (category) => {
        await sequelize.query(`INSERT INTO category_${instituteNumber} (categoryName, categoryDescription) VALUES (?, ?)`, {
            replacements: [category.categoryName, category.description]
        });
      });
      next()
    }
}
export default instituteController
