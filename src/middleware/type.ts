import { Request } from "express";

export interface IExtendedRequest extends Request{
       user ?: {
       id : string,
        email : string, 
        role : string, 
        currentInstituteNumber:string
       }, 
       instituteNumber ?: number | string
      
}