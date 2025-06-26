import { NextFunction, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";


class TeacherController {
  //create a new teacher
  static async createTeacher(req: IExtendedRequest, res: Response, next: NextFunction) {
    const instituteNumber = req.user?.currentInstituteNumber;
    if (!req.body) {
      res.status(400).json({
        message: "Please provide teacher details in the request body"
      });
      return;
    }
    
    const  {teacherName,teacherEmail,teacherPhoneNumber,teacherAddress,teacherExpertise,joinedDate,salary} = req.body;
    const teacherImage = req.file?.filename || null;
    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherAddress || !teacherExpertise || !joinedDate || !salary) {
      res.status(400).json({ message: "Please provide all required fields teacherName, teacherEmail, teacherPhoneNumber, teacherAddress, teacherExpertise, joinedDate, salary" });
      return;
    }
    const teacherPasswordData = generateRandomPassword();
    const teacherPassword = teacherPasswordData.hashedPassword || null;
    await sequelize.query(`INSERT INTO teacher_${instituteNumber}(
      teacherName, teacherEmail, teacherPhoneNumber, teacherAddress, teacherExpertise, joinedDate, salary, teacherImage, teacherPassword
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, {
      type: QueryTypes.INSERT,
      replacements: [teacherName, teacherEmail, teacherPhoneNumber, teacherAddress, teacherExpertise, joinedDate, salary, teacherImage, teacherPassword]
    });
    res.status(201).json({
      message: "Teacher created successfully",
    });

}
static async getTeachers(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`, {
      type: QueryTypes.SELECT
    });
    res.status(200).json({
      message: "Teachers fetched successfully",
      data: teachers
    });
  }
  static async deleteTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teacherId = req.params.id;
    if(!teacherId) {
      res.status(400).json({
        message: "Teacher ID is required"
      });
      return;
    }
    const teacherExists = await sequelize.query(`SELECT * FROM teacher_${instituteNumber} WHERE id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [teacherId]
    });
    if (!teacherExists || teacherExists.length === 0) {
      res.status(404).json({
        message: "Teacher not found"
      });
      return;
    }

    await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`, {
      type: QueryTypes.DELETE,
      replacements: [teacherId]
    });
    res.status(200).json({
      message: "Teacher deleted successfully"
    });
  }
}

export default TeacherController;