
import { Request } from 'express'
import multer from 'multer'


multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,'/src/storage')

    },
    filename:function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,Date.now()+'_'+file.originalname)
    }
    
})