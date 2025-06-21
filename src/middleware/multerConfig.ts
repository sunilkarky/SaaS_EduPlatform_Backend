
import { Request } from 'express'
import multer from 'multer'


const storage=multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb:any){
    //image format checker
    const acceptedFileFormat = ["image/jpg", "image/png", "image/jpeg"];
    if (!acceptedFileFormat.includes(file.mimetype)) {
      cb(new Error("Invalid file format only support png , jpg , jpeg"), false);
      return;
    }
    cb(null, "./src/uploads");
  },
    filename:function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,Date.now()+'_'+file.originalname)
    },
    
    
    
})

export {multer,storage}