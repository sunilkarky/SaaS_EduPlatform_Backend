import multer from "multer";
import { storage } from "./multerConfig";

const upload =multer({
    storage:storage,
    limits:{
        fileSize:4*1024*1024

    }
})
export default upload;