import { Request, Response } from "express"
import sequelize from "../../database/connection"

class instituteController{
     static async createInstitute(req:Request,res:Response){
        const {instituteName,institutePhoneNumber,instituteEmail,institutePan,instituteAddress}=req.body
        const instituteVatNo=req.body.instituteVatNo ||null
        const institutePanNo=req.body.institutePanNo || null
        if (!instituteName || !instituteAddress|| !instituteEmail || !institutePhoneNumber ){
            res.status(400).json({
                message:"Please provide instituteName,institutePhoneNumber,instituteEmail,institutePan,instituteAddress "
            })
            return
        }
        await sequelize.query(`CREATE TABLE institute(
            id  INT NOT NULL PRIMARY KEY AUTO INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)
            res.status(200).json({
                message:"Institute Created successfully"
            })
    }
}
export default instituteController