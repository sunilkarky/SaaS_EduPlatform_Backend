import { envConfig } from "../config/config";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name:envConfig.cloudinaryCloudName,
    api_key:envConfig.cloudinaryApiKey,
    api_secret:envConfig.cloudinarySecretKey
})

const storage=new CloudinaryStorage({
    cloudinary,
    params:async(req,file)=>(
        {
            folder:"saas_platform"
        }
    )
})

export {cloudinary,storage} 

 
