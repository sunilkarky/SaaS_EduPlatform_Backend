import {config} from 'dotenv'

config()

export const envConfig={
    portNumber:process.env.PORT,
    database:process.env.DB_NAME,
    userName:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
    cloudinarySecretKey:process.env.CLOUDINARY_SECRET_KEY,
    cloudinaryCloudName:process.env.CLOUDINARY_CLOUD_NAME,
    // Email configuration
    gmailUser:process.env.GMAIL_USER,
    gmailPass:process.env.GMAIL_PASS,
    // JWT configuration
    jwtSecretKey:process.env.JWT_SECRET_KEY,
    jwtExpire:process.env.JWT_EXPIRE

}
