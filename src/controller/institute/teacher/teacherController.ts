import { NextFunction, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";

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
    const  {teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary} = req.body;

}
}