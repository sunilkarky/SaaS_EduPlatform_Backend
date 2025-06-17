import { NextFunction, Request, Response } from "express"
import sequelize from "../../database/connection"
import generateRandomNumber from '../../services/randomNumberGenerate'
import { IExtendedRequest } from "../../middleware/type"
import User from "../../database/models/user.model"



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
          id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
      try{

        await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
          id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
          userId VARCHAR(255) REFERENCES users(id),
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
        }  catch(e){
          console.log(e,"error here")
        }  
      req.instituteNumber=instituteNumber
      next()
    }
    }

    //create table
    static async createTeacher(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteNumber=req.instituteNumber
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
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        teacherName VARCHAR(255) NOT NULL,
        teacherEmail VARCHAR(255) NOT NULL UNIQUE,
        teacherPhoneNumber VARCHAR(255) NOT NULL,
        teacherAddress VARCHAR(255) NOT NULL,
        teacherExpertise varchar(255),
        joinedDate DATE,
        salary VARCHAR(255),
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
      req.instituteNumber=instituteNumber
      next()
    }
    static async createStudent(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteNumber=req.instituteNumber
      // const {studentName,studentEmail,studentPhoneNumber,studentAddress}=req.body
      // if(!studentName||studentEmail||studentPhoneNumber||studentAddress){
      //   res.status(400).json({
      //     message:"Please provide all fields studentName,studentEmail,studentPhoneNumber,studentAddress"
      //   })
      //   return
      // }
      await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
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
      req.instituteNumber=instituteNumber
      next()
    }
    static async createCourse(req:IExtendedRequest,res:Response){
      const instituteNumber=req.instituteNumber
      //course-table
      await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
        courseName VARCHAR(255) NOT NULL UNIQUE,
        coursePrice VARCHAR(255) NOT NULL ,
        courseDuration VARCHAR(255) NOT NULL,
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
        courseThumbnail VARCHAR(200),
        courseDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
        res.status(200).json({
          message:"Institute Created Successfully",
          instituteNumber,
        })
    }
}
export default instituteController
