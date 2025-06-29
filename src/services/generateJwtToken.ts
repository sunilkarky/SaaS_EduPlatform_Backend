import jwt from 'jsonwebtoken';
import { envConfig } from '../config/config';
const generateJwtToken=(dataToEncrypt:{
    id: string,
    instituteNumber?: string
})=>{
    //@ts-ignore
    const token =  jwt.sign(dataToEncrypt,envConfig.jwtSecretKey!,{
        expiresIn : envConfig.jwtExpire
        })
    return token
    }
export default generateJwtToken;